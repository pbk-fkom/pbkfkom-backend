const User = require("../models/Users");
const bcrypt = require('bcryptjs');

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage")
      const alertStatus = req.flash("alertStatus")

      const alert = { message: alertMessage, status: alertStatus }
      if (req.session.user === null || req.session.user === undefined) {
        res.render('auth/login', {
          alert,
          title: "Login",
          layout: './layouts/auth'
        })
      } else {
        res.redirect('/dashboard')
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/secret')

    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body
      const check = await User.findOne({ username })

      if (check) {
        const checkPassword = await bcrypt.compare(password, check.password)
        if (checkPassword) {
          req.session.user = {
            id: check._id,
            username: check.username
          }
          res.redirect('/dashboard')
        } else {
          req.flash("alertMessage", "Kata sandi yang anda inputkan salah")
          req.flash("alertStatus", "danger")
          res.redirect('/secret')
        }
      } else {
        req.flash("alertMessage", "Username yang anda inputkan salah")
        req.flash("alertStatus", "danger")
        res.redirect('/secret')
      }

    } catch (err) {
      req.flash("alertMessage", `${err.message}`)
      req.flash("alertStatus", "danger")
      res.redirect('/secret')
    }
  },

  logout : (req, res)=>{
    req.session.destroy();
    res.redirect('/secret')
  }
};