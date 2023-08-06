const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      const users = await Users.find().sort({ _id: -1 });

      res.render("users/index", {
        users,
        alert,
        title: "Pengguna",
      });
    } catch (err) {
      console.log(err);
    }
  },

  edit: async (req, res) => {
    try {
      const errors = req.flash("errors");
      const { id } = req.params;
      const user = await Users.findById(id);

      res.render("users/edit", {
        errors,
        user,
        title: "Edit Pengguna",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/users");
    }
  },

  update: async (req, res) => {
    try {
      const err = validationResult(req);
      const { id } = req.params;
      const { username, password } = req.body;

      if (!err.isEmpty()) {
        const errors = err.array();

        req.flash("errors", errors);

        res.redirect(`/users/${id}/edit`);

        return false;
      }

      if (password.length != 0) {
        const hashPassword = bcrypt.hashSync(password);

        await Users.findOneAndUpdate(
          {
            _id: id,
          },
          { username, password: hashPassword }
        );
      } else {
        await Users.findOneAndUpdate(
          {
            _id: id,
          },
          { username }
        );
      }

      req.flash("alertMessage", "Berhasil mengedit pengguna");
      req.flash("alertStatus", "success");

      res.redirect("/users");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/users");
    }
  },
};
