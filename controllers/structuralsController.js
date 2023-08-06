const Structurals = require("../models/Structurals");
const { validationResult } = require("express-validator");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const structurals = await Structurals.find().sort({ _id: -1 });

      res.render("structurals/index", {
        structurals,
        alert,
        title: "Struktural",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/structurals");
    }
  },

  create: async (req, res) => {
    try {
      const errors = req.flash("errors");

      res.render("structurals/create", {
        errors,
        title: "Tambah Struktural",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/structurals");
    }
  },

  store: async (req, res) => {
    try {
      const err = validationResult(req);
      const { name, description } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect("/structurals/create");

        return false;
      }

      await Structurals.create({ name, description });

      req.flash("alertMessage", "Berhasil menambahkan struktural");
      req.flash("alertStatus", "success");

      res.redirect("/structurals");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/structurals");
    }
  },

  edit: async (req, res) => {
    try {
      const errors = req.flash("errors");
      const { id } = req.params;
      const structural = await Structurals.findById(id);

      res.render("structurals/edit", {
        errors,
        structural,
        title: "Edit Struktural",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/structurals");
    }
  },

  update: async (req, res) => {
    try {
      const err = validationResult(req);
      const { id } = req.params;
      const { name, description } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect(`/structurals/${id}/edit`);

        return false;
      }

      await Structurals.findOneAndUpdate(
        {
          _id: id,
        },
        { name, description }
      );

      req.flash("alertMessage", "Berhasil mengedit struktural");
      req.flash("alertStatus", "success");

      res.redirect("/structurals");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/structurals");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Structurals.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus struktural");
      req.flash("alertStatus", "success");
      res.redirect("/structurals");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/structurals");
    }
  },
};
