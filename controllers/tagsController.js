const Tags = require("../models/Tags");
const { validationResult } = require("express-validator");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const tags = await Tags.find();

      res.render("tags/index", {
        tags,
        alert,
        title: "Tag",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/tags");
    }
  },

  create: async (req, res) => {
    try {
      const errors = req.flash("errors");

      res.render("tags/create", {
        errors,
        title: "Tambah Tag",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/tags");
    }
  },

  store: async (req, res) => {
    try {
      const err = validationResult(req);
      const { name } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect("/tags/create");

        return false;
      }

      await Tags.create({ name });

      req.flash("alertMessage", "Berhasil menambahkan tag");
      req.flash("alertStatus", "success");

      res.redirect("/tags");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/tags");
    }
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const tag = await Tags.findById(id);
      const errors = req.flash("errors");

      res.render("tags/edit", {
        errors,
        tag,
        title: "Edit tag",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/tags");
    }
  },

  update: async (req, res) => {
    try {
      const err = validationResult(req);
      const { id } = req.params;
      const { name } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect(`/tags/${id}/edit`);

        return false;
      }

      await Tags.findOneAndUpdate(
        {
          _id: id,
        },
        { name }
      );

      req.flash("alertMessage", "Berhasil mengedit kategori");
      req.flash("alertStatus", "success");

      res.redirect("/tags");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/tags");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Tags.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus kategori");
      req.flash("alertStatus", "success");
      res.redirect("/tags");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/tags");
    }
  },

  // API Controller
  indexAPI: async (req, res) => {
    try {
      const tags = await Tags.find();

      res.status(200).json({ data: tags });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
