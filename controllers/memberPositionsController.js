const MemberPositions = require("../models/MemberPositions");
const { validationResult } = require("express-validator");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const memberPositions = await MemberPositions.find().sort({ _id: -1 });

      res.render("member-positions/index", {
        memberPositions,
        alert,
        title: "Jabatan Pengurus",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/member-positions");
    }
  },

  create: async (req, res) => {
    try {
      const errors = req.flash("errors");

      res.render("member-positions/create", {
        errors,
        title: "Tambah Jabatan Pengurus",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/member-positions");
    }
  },

  store: async (req, res) => {
    try {
      const err = validationResult(req);
      const { name } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect("/member-positions/create");

        return false;
      }

      await MemberPositions.create({ name });

      req.flash("alertMessage", "Berhasil menambahkan jabatan pengurus");
      req.flash("alertStatus", "success");

      res.redirect("/member-positions");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/member-positions");
    }
  },

  edit: async (req, res) => {
    try {
      const errors = req.flash("errors");
      const { id } = req.params;
      const memberPosition = await MemberPositions.findById(id);

      res.render("member-positions/edit", {
        errors,
        memberPosition,
        title: "Edit Jabatan Pengurus",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/member-positions");
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

        res.redirect(`/member-positions/${id}/edit`);

        return false;
      }

      await MemberPositions.findOneAndUpdate(
        {
          _id: id,
        },
        { name }
      );

      req.flash("alertMessage", "Berhasil mengedit jabatan pengurus");
      req.flash("alertStatus", "success");

      res.redirect("/member-positions");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/member-positions");
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      await MemberPositions.findByIdAndDelete(id);

      req.flash("alertMessage", "Berhasil menghapus jabatan pengurus");
      req.flash("alertStatus", "success");
      res.redirect("/member-positions");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/member-positions");
    }
  },
};
