const Achievements = require("../models/Achievements");
const { validationResult } = require("express-validator");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const achievements = await Achievements.find();

      res.render("achievements/index", {
        achievements,
        alert,
        title: "Prestasi",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/achievements");
    }
  },

  create: async (req, res) => {
    try {
      const errors = req.flash("errors");

      res.render("achievements/create", {
        errors,
        title: "Tambah Prestasi",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/achievements");
    }
  },

  store: async (req, res) => {
    try {
      const err = validationResult(req);
      const { activity_name, name, rank, year } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect("/achievements/create");

        return false;
      }

      await Achievements.create({ activity_name, name, rank, year });

      req.flash("alertMessage", "Berhasil menambahkan prestasi");
      req.flash("alertStatus", "success");

      res.redirect("/achievements");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/achievements");
    }
  },

  edit: async (req, res) => {
    try {
      const errors = req.flash("errors");
      const { id } = req.params;
      const achievement = await Achievements.findById(id);

      res.render("achievements/edit", {
        errors,
        achievement,
        title: "Edit Prestasi",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/achievements");
    }
  },

  update: async (req, res) => {
    try {
      const err = validationResult(req);
      const { id } = req.params;
      const { activity_name, name, rank, year } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect(`/achievements/${id}/edit`);

        return false;
      }

      await Achievements.findOneAndUpdate(
        {
          _id: id,
        },
        { activity_name, name, rank, year }
      );

      req.flash("alertMessage", "Berhasil mengedit prestasi");
      req.flash("alertStatus", "success");

      res.redirect("/achievements");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/achievements");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await Achievements.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus prestasi");
      req.flash("alertStatus", "success");
      res.redirect("/achievements");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/achievements");
    }
  },

  // API Controller
  indexAPI: async (req, res) => {
    try {
      const achievements = await Achievements.find().sort({ _id: -1 });

      res.status(200).json({ data: achievements });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
