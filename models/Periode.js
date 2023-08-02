const mongoose = require('mongoose')
const URLSlugs = require('mongoose-slug-updater');

mongoose.plugin(URLSlugs);

const periodeScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama periode harus diisi']
  },
  tagline: {
    type: String,
    require: [true, 'Tagline periode harus diisi']
  },
  periode_year: {
    type: String,
    require: [true, 'Tahun periode harus diisi']
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

module.exports = mongoose.model('Periode', periodeScheme);