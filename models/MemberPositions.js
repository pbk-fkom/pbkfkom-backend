const mongoose = require('mongoose')

const memberPositionsScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Nama jabatan pengurus harus diisi']
  },
}, 
{
    timestamps: true
 });

module.exports = mongoose.model('MemberPositions', memberPositionsScheme);