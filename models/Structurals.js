const mongoose = require('mongoose')
const URLSlugs = require('mongoose-slug-updater');

mongoose.plugin(URLSlugs);

const structuralsScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama struktural harus diisi']
  },
  description: {
    type: String,
    require: [true, 'Deskripsi struktural harus diisi']
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
}, 
{
    timestamps: true
 });

module.exports = mongoose.model('Structurals', structuralsScheme);    