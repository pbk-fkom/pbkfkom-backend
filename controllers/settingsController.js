const Settings = require("../models/Settings");
const config = require("../config");
const B2 = require("backblaze-b2");
const sharp = require("sharp");

const b2 = new B2({
  applicationKeyId: config.applicationKeyId,
  applicationKey: config.applicationKey,
});

const PATH = "assets/about";

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const setting = await Settings.find();

      res.render("settings/index", {
        setting,
        alert,
        title: "Pengaturan",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/settings");
    }
  },

  update: async (req, res) => {
    try {
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
          res.redirect("/settings");

          return false;
        }

        if (req.file.size >= 1024000) {
          req.flash("alertMessage", "Ukuran file maksimal 1MB");
          req.flash("alertStatus", "danger");
          res.redirect("/settings");

          return false;
        }

        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = `about-photo-${Date.now()}.${originaExt}`;
        let buffer = await sharp(req.file.buffer)
          .resize()
          .jpeg({ quality: 80 })
          .toBuffer();

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
                await Settings.findOneAndUpdate(
                  {
                    key: "site_about_photo",
                  },
                  { value: filename }
                );

                req.flash("alertMessage", "Berhasil mengedit pengurus");
                req.flash("alertStatus", "success");

                res.redirect("/settings");
              })
              .catch((err) => {
                req.flash("alertMessage", `${err.message}`);
                req.flash("alertStatus", "danger");
                res.redirect("/settings");
              });
          })
          .catch((err) => {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/settings");
          });
      } else {
        Object.keys(req.body).forEach(async (key) => {
          await Settings.findOneAndUpdate(
            {
              key: key,
            },
            { value: req.body[key] }
          );
        });

        req.flash("alertMessage", "Berhasil mengedit pengaturan");
        req.flash("alertStatus", "success");

        res.redirect("/settings");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/settings");
    }
  },
};
