const mongoose = require('mongoose')

const achievementsScheme = mongoose.Schema({
  activity_name: {
    type: String,
    require: [true, 'Nama kategori harus diisi']
  },
  name: {
    type: String,
    require: [true, 'Nama peserta harus diisi']
  },
  rank: {
    type: String,
    require: [true, 'Peringkat harus diisi']
  },
  year: {
    type: String,
    require: [true, 'Tahun harus diisi']
  },
}, 
{
    timestamps: true
 });

module.exports = mongoose.model('Achievements', achievementsScheme);