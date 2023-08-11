const Posts = require("../models/Posts");
const Categories = require("../models/Categories");
const Tags = require("../models/Tags");
const config = require("../config");
const sharp = require("sharp");
const { validationResult } = require("express-validator");
const slugify = require("slugify");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  endpoint: {
    hostname: config.hostname,
    protocol: config.protocol,
    path: config.path,
  },
  region: config.region,
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
});

const PATH = "assets/members";

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const posts = await Posts.find()
        .sort({ _id: -1 })
        .populate(["categoryId", "tagId", "userId"]);

      res.render("posts/index", {
        posts,
        alert,
        title: "Artikel",
      });
    } catch (err) {
      console.log(err);
    }
  },

  create: async (req, res) => {
    try {
      const errors = req.flash("errors");
      const categories = await Categories.find();
      const tags = await Tags.find();

      res.render("posts/create", {
        errors,
        categories,
        tags,
        title: "Tambah Artikel",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/posts");
    }
  },

  store: async (req, res) => {
    try {
      const err = validationResult(req);
      const { title, content, tags, category, status, writer } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect("/posts/create");

        return false;
      }

      if (req.file) {
        if (
          !(
            req.file.mimetype === "image/jpeg" ||
            req.file.mimetype === "image/png"
          )
        ) {
          req.flash(
            "alertMessage",
            "Format file tidak didukung, hanya mendukung png,jpg dan jpeg"
          );
          req.flash("alertStatus", "danger");
          res.redirect("/posts");

          return false;
        }

        if (req.file.size >= 1024000) {
          req.flash("alertMessage", "Ukuran file maksimal 1MB");
          req.flash("alertStatus", "danger");
          res.redirect("/posts");

          return false;
        }

        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = `${slugify(title)}-${Date.now()}.${originaExt}`;
        let buffer = await sharp(req.file.buffer)
          .resize()
          .jpeg({ quality: 80 })
          .toBuffer();

        try {
          const uploadParams = {
            Bucket: config.bucketName,
            Key: `${PATH}/${filename}`,
            Body: buffer,
            ACL: "public-read",
          };

          const commandUpload = new PutObjectCommand(uploadParams);
          await s3Client.send(commandUpload);

          const post = new Posts({
            title,
            content,
            categoryId: category,
            tagId: tags,
            status,
            writer,
            userId: req.session.user.id,
            thumbnail: filename,
          });

          await post.save();

          req.flash("alertMessage", "Berhasil menambahkan artikel");
          req.flash("alertStatus", "success");

          res.redirect("/posts");
        } catch (err) {
          req.flash("alertMessage", `${err.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/posts");
        }
      } else {
        req.flash("alertMessage", "Pilih thumbnail");
        req.flash("alertStatus", "danger");

        res.redirect("/posts");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/posts");
    }
  },

  edit: async (req, res) => {
    try {
      const errors = req.flash("errors");
      const { id } = req.params;
      const post = await Posts.findById(id).populate([
        "categoryId",
        "tagId",
        "userId",
      ]);
      const categories = await Categories.find();
      const tags = await Tags.find();

      res.render("posts/edit", {
        errors,
        post,
        categories,
        tags,
        title: "Edit Artikel",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/posts");
    }
  },

  update: async (req, res) => {
    try {
      const err = validationResult(req);
      const { id } = req.params;
      const { title, content, tags, category, status, writer } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect(`/posts/${id}/edit`);

        return false;
      }

      if (req.file) {
        if (
          !(
            req.file.mimetype === "image/jpeg" ||
            req.file.mimetype === "image/png"
          )
        ) {
          req.flash(
            "alertMessage",
            "Format file tidak didukung, hanya mendukung png,jpg dan jpeg"
          );
          req.flash("alertStatus", "danger");
          res.redirect("/posts");

          return false;
        }

        if (req.file.size >= 1024000) {
          req.flash("alertMessage", "Ukuran file maksimal 1MB");
          req.flash("alertStatus", "danger");
          res.redirect("/posts");

          return false;
        }

        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = `${slugify(title)}-${Date.now()}.${originaExt}`;
        let buffer = await sharp(req.file.buffer)
          .resize()
          .jpeg({ quality: 80 })
          .toBuffer();

        try {
          const post = await Posts.findOne({ _id: id });

          const deleteParams = {
            Bucket: config.bucketName,
            Key: `${PATH}/${post.thumbnail}`,
          };

          const command = new DeleteObjectCommand(deleteParams);
          await s3Client.send(command);

          const uploadParams = {
            Bucket: config.bucketName,
            Key: `${PATH}/${filename}`,
            Body: buffer,
            ACL: "public-read",
          };

          const commandUpload = new PutObjectCommand(uploadParams);
          await s3Client.send(commandUpload);

          await Posts.findOneAndUpdate(
            {
              _id: id,
            },
            {
              title,
              content,
              categoryId: category,
              tagId: tags,
              status,
              writer,
              userId: req.session.user.id,
              thumbnail: filename,
            }
          );

          req.flash("alertMessage", "Berhasil mengedit artikel");
          req.flash("alertStatus", "success");
          res.redirect("/posts");
        } catch (err) {
          req.flash("alertMessage", `${err.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/posts");
        }
      } else {
        await Posts.findOneAndUpdate(
          {
            _id: id,
          },
          {
            title,
            content,
            categoryId: category,
            tagId: tags,
            status,
            writer,
            userId: req.session.user.id,
          }
        );
        req.flash("alertMessage", "Berhasil mengedit artikel");
        req.flash("alertStatus", "success");
        res.redirect("/posts");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/posts");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const post = await Posts.findOneAndRemove({
        _id: id,
      });

      try {
        const deleteParams = {
          Bucket: config.bucketName,
          Key: `${PATH}/${post.thumbnail}`,
        };

        const command = new DeleteObjectCommand(deleteParams);
        await s3Client.send(command);

        req.flash("alertMessage", "Berhasil menghapus artikel");
        req.flash("alertStatus", "success");
        res.redirect("/posts");
      } catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/posts");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/posts");
    }
  },
};
