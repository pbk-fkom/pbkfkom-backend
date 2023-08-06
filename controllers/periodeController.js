const Periode = require("../models/Periode");
const { validationResult } = require("express-validator");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const periode = await Periode.find().sort({ _id: -1 });

      res.render("periode/index", {
        periode,
        alert,
        title: "Periode",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/periode");
    }
  },

  create: async (req, res) => {
    try {
      const errors = req.flash("errors");

      res.render("periode/create", {
        errors,
        title: "Tambah Periode",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/periode");
    }
  },

  store: async (req, res) => {
    try {
      const err = validationResult(req);
      const { name, tagline, periode_year } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect(`/periode/create`);

        return false;
      }

      await Periode.create({ name, tagline, periode_year });

      req.flash("alertMessage", "Berhasil menambahkan periode");
      req.flash("alertStatus", "success");

      res.redirect("/periode");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/periode");
    }
  },

  edit: async (req, res) => {
    try {
      const errors = req.flash("errors");
      const { id } = req.params;
      const periode = await Periode.findById(id);

      res.render("periode/edit", {
        errors,
        periode,
        title: "Edit Periode",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/periode");
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, tagline, periode_year } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect(`/periode/${id}/edit`);

        return false;
      }

      await Periode.findOneAndUpdate(
        {
          _id: id,
        },
        { name, tagline, periode_year }
      );

      req.flash("alertMessage", "Berhasil mengedit periode");
      req.flash("alertStatus", "success");

      res.redirect("/periode");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/periode");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Periode.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus periode");
      req.flash("alertStatus", "success");
      res.redirect("/periode");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/periode");
    }
  },
};
