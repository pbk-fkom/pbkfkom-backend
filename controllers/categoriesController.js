const Categories = require("../models/Categories");
const { validationResult } = require("express-validator");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const categories = await Categories.find().sort({ _id: -1 });

      res.render("categories/index", {
        categories,
        alert,
        title: "Kategori",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/categories");
    }
  },

  create: async (req, res) => {
    try {
      const errors = req.flash("errors");

      res.render("categories/create", {
        errors,
        title: "Tambah Kategori",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/categories");
    }
  },

  store: async (req, res) => {
    try {
      const err = validationResult(req);
      const { name } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect("/categories/create");

        return false;
      }

      await Categories.create({ name });

      req.flash("alertMessage", "Berhasil menambahkan kategori");
      req.flash("alertStatus", "success");

      res.redirect("/categories");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/categories");
    }
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Categories.findById(id);
      const errors = req.flash("errors");

      res.render("categories/edit", {
        errors,
        category,
        title: "Edit Kategori",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/categories");
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

        res.redirect(`/categories/${id}/edit`);

        return false;
      }

      await Categories.findOneAndUpdate(
        {
          _id: id,
        },
        { name }
      );

      req.flash("alertMessage", "Berhasil mengedit kategori");
      req.flash("alertStatus", "success");

      res.redirect("/categories");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/categories");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Categories.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus kategori");
      req.flash("alertStatus", "success");
      res.redirect("/categories");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/categories");
    }
  },
};
