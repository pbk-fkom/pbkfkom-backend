const mongoose = require('mongoose')
const URLSlugs = require('mongoose-slug-updater');

mongoose.plugin(URLSlugs);

const categoriesScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama kategori harus diisi']
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

module.exports = mongoose.model('Categories', categoriesScheme);