const mongoose = require("mongoose");

const bcrypt = require('bcryptjs')

const HASH_ROUND = 10

const usersScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama harus diisi']
  },
  username: {
    type: String,
    unique: true,
    require: [true, 'Username harus diisi']
  },
  password: {
    type: String,
    require: [true, 'kata sandi harus diisi'],
    maxlength :[225, "panjang password maksimal 225 karakter"]
  },
  role: {
    type: String,
    enum: ['super_admin', 'ketum', 'sekum', 'medinfo'],
    required: true
  }
},
{
    timestamps: true
});

module.exports = mongoose.model("Users", usersScheme);