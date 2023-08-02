const mongoose = require('mongoose')
const URLSlugs = require('mongoose-slug-updater');

mongoose.plugin(URLSlugs);

const tagsSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama tag harus diisi']
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

module.exports = mongoose.model('Tags', tagsSchema);