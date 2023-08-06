const Members = require("../models/Members");
const MemberPositions = require("../models/MemberPositions");
const Structurals = require("../models/Structurals");
const Periode = require("../models/Periode");
const path = require("path");
const fs = require("fs");
const config = require("../config");
const readXlsxFile = require("read-excel-file/node");
const sharp = require("sharp");
const { validationResult } = require("express-validator");
const B2 = require("backblaze-b2");
const slugify = require("slugify");

const b2 = new B2({
  applicationKeyId: config.applicationKeyId,
  applicationKey: config.applicationKey,
});

const PATH = "assets/members";

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const members = await Members.find()
        .sort({ _id: -1 })
        .populate(["memberPositionId", "structuralId", "periodeId"]);

      res.render("members/index", {
        members,
        alert,
        title: "Pengurus",
      });
    } catch (err) {
      console.log(err);
    }
  },

  create: async (req, res) => {
    try {
      const errors = req.flash("errors");
      const memberPositions = await MemberPositions.find();
      const structurals = await Structurals.find();
      const periode = await Periode.find();

      res.render("members/create", {
        errors,
        memberPositions,
        structurals,
        periode,
        title: "Tambah Pengurus",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/members");
    }
  },

  store: async (req, res) => {
    try {
      const err = validationResult(req);
      const {
        nim,
        name,
        email,
        classes,
        gender,
        phone,
        address,
        instagram,
        member_position,
        structural,
        periode,
      } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect("/members/create");

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
          res.redirect("/members");

          return false;
        }

        if (req.file.size >= 1024000) {
          req.flash("alertMessage", "Ukuran file maksimal 1MB");
          req.flash("alertStatus", "danger");
          res.redirect("/members");

          return false;
        }

        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = `${slugify(name)}-${Date.now()}.${originaExt}`;
        let buffer = await sharp(req.file.buffer)
          .resize()
          .jpeg({ quality: 80 })
          .toBuffer();

        try {
          await b2.authorize();
          b2.getUploadUrl({
            bucketId: config.bucketId,
          })
            .then((response) => {
              b2.uploadFile({
                uploadUrl: response.data.uploadUrl,
                uploadAuthToken: response.data.authorizationToken,
                fileName: `${PATH}/${filename}`,
                data: buffer,
              })
                .then(async (response) => {
                  const member = new Members({
                    nim,
                    name,
                    email,
                    classes,
                    gender,
                    phone,
                    address,
                    instagram,
                    memberPositionId: member_position,
                    structuralId: structural,
                    periodeId: periode,
                    photo: filename,
                  });

                  await member.save();

                  req.flash("alertMessage", "Berhasil menambahkan pengurus");
                  req.flash("alertStatus", "success");

                  res.redirect("/members");
                })
                .catch((err) => {
                  req.flash("alertMessage", `${err.message}`);
                  req.flash("alertStatus", "danger");
                  res.redirect("/members");
                });
            })
            .catch((err) => {
              req.flash("alertMessage", `${err.message}`);
              req.flash("alertStatus", "danger");
              res.redirect("/members");
            });
        } catch (err) {
          req.flash("alertMessage", `${err.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/members");
        }
      } else {
        req.flash("alertMessage", "Pilih foto");
        req.flash("alertStatus", "danger");

        res.redirect("/members");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/members");
    }
  },

  edit: async (req, res) => {
    try {
      const errors = req.flash("errors");
      const { id } = req.params;
      const member = await Members.findById(id).populate([
        "memberPositionId",
        "structuralId",
        "periodeId",
      ]);
      const memberPositions = await MemberPositions.find();
      const structurals = await Structurals.find();
      const periode = await Periode.find();

      res.render("members/edit", {
        errors,
        member,
        memberPositions,
        structurals,
        periode,
        title: "Edit Pengurus",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/members");
    }
  },

  update: async (req, res) => {
    try {
      const err = validationResult(req);
      const { id } = req.params;
      const {
        nim,
        name,
        email,
        classes,
        gender,
        phone,
        address,
        instagram,
        member_position,
        structural,
        periode,
      } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect(`/members/${id}/edit`);

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
          res.redirect("/members");

          return false;
        }

        if (req.file.size >= 1024000) {
          req.flash("alertMessage", "Ukuran file maksimal 1MB");
          req.flash("alertStatus", "danger");
          res.redirect("/members");

          return false;
        }

        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = `${slugify(name)}-${Date.now()}.${originaExt}`;
        let buffer = await sharp(req.file.buffer)
          .resize()
          .jpeg({ quality: 80 })
          .toBuffer();

        try {
          await b2.authorize();
          b2.getUploadUrl({
            bucketId: config.bucketId,
          })
            .then((response) => {
              b2.uploadFile({
                uploadUrl: response.data.uploadUrl,
                uploadAuthToken: response.data.authorizationToken,
                fileName: `${PATH}/${filename}`,
                data: buffer,
              })
                .then(async (response) => {
                  const member = await Members.findOne({ _id: id });

                  b2.hideFile({
                    bucketId: config.bucketId,
                    fileName: `${PATH}/${member.photo}`,
                  })
                    .then(async (response) => {
                      await Members.findOneAndUpdate(
                        {
                          _id: id,
                        },
                        {
                          nim,
                          name,
                          email,
                          classes,
                          gender,
                          phone,
                          address,
                          instagram,
                          memberPositionId: member_position,
                          structuralId: structural,
                          periodeId: periode,
                          photo: filename,
                        }
                      );

                      req.flash("alertMessage", "Berhasil mengedit pengurus");
                      req.flash("alertStatus", "success");
                      res.redirect("/members");
                    })
                    .catch((err) => {
                      req.flash("alertMessage", `${err.message}`);
                      req.flash("alertStatus", "danger");
                      res.redirect("/members");
                    });
                })
                .catch((err) => {
                  req.flash("alertMessage", `${err.message}`);
                  req.flash("alertStatus", "danger");
                  res.redirect("/members");
                });
            })
            .catch((err) => {
              req.flash("alertMessage", `${err.message}`);
              req.flash("alertStatus", "danger");
              res.redirect("/members");
            });
        } catch (err) {
          req.flash("alertMessage", `${err.message}`);
          req.flash("alertStatus", "danger");
          res.redirect("/members");
        }
      } else {
        await Members.findOneAndUpdate(
          {
            _id: id,
          },
          {
            nim,
            name,
            email,
            classes,
            gender,
            phone,
            address,
            instagram,
            memberPositionId: member_position,
            structuralId: structural,
          }
        );

        req.flash("alertMessage", "Berhasil mengedit pengurus");
        req.flash("alertStatus", "success");

        res.redirect("/members");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/members");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const member = await Members.findOneAndRemove({
        _id: id,
      });

      try {
        await b2.authorize();
        b2.hideFile({
          bucketId: config.bucketId,
          fileName: `${PATH}/${member.photo}`,
        })
          .then((response) => {
            req.flash("alertMessage", "Berhasil menghapus pengurus");
            req.flash("alertStatus", "success");
            res.redirect("/members");
          })
          .catch((err) => {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");

            res.redirect("/members");
          });
      } catch (err) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/members");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/members");
    }
  },

  import: async (req, res) => {
    try {
      res.render("members/import", {
        title: "Import Pengurus",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/members");
    }
  },

  importStore: async (req, res) => {
    try {
      if (
        !(
          req.file.mimetype.includes("excel") ||
          req.file.mimetype.includes("spreadsheetml")
        )
      ) {
        req.flash(
          "alertMessage",
          "Format file tidak didukung, hanya mendukung .xlx dan .xlsx"
        );
        req.flash("alertStatus", "danger");
        res.redirect("/members");

        return false;
      }

      const pathFile = path.resolve(
        config.rootPath,
        `public/assets/uploads/${req.file.filename}`
      );

      readXlsxFile(pathFile).then(async (rows) => {
        rows.shift();

        let members = [];

        for (let row of rows) {
          let memberPositionId = await MemberPositions.findOne({
            name: row[8],
          });
          if (!memberPositionId) {
            req.flash("alertMessage", "Jabatan tidak ditemukan");
            req.flash("alertStatus", "danger");

            res.redirect("/members");

            return false;
          }
          let structuralId = await Structurals.findOne({ name: row[9] });
          if (!structuralId) {
            req.flash("alertMessage", "Struktural tidak ditemukan");
            req.flash("alertStatus", "danger");

            res.redirect("/members");

            return false;
          }

          let periodeId = await Periode.findOne({ periode_year: row[10] });
          if (periodeId == undefined) {
            req.flash("alertMessage", "Periode tidak ditemukan");
            req.flash("alertStatus", "danger");

            res.redirect("/members");

            return false;
          }

          let member = {
            nim: row[0],
            name: row[1],
            email: row[2],
            classes: row[3],
            gender: row[4],
            phone: row[5],
            address: row[6],
            instagram: row[7],
            memberPositionId: memberPositionId,
            structuralId: structuralId,
            periodeId: periodeId,
          };

          members.push(member);
        }

        try {
          Members.insertMany(members);

          req.flash("alertMessage", "Berhasil mengimport data pengurus");
          req.flash("alertStatus", "success");
          res.redirect("/members");
        } catch (e) {
          req.flash("alertMessage", `${e.message}`);
          req.flash("alertStatus", "danger");

          res.redirect("/members");
        }

        fs.unlinkSync(pathFile);
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/members");
    }
  },
};
