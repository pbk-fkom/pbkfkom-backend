const mongoose = require('mongoose')

const membersScheme = mongoose.Schema({
  nim: {
    type: String,
    default: '202108',
  },
  name: {
    type: String,
    require: [true, 'Nama harus diisi'],
    default: 'PBK FKOM',
  },
  email: {
    type: String,
    default: 'pbk.fkom@uniku.ac.id',
  },
  classes: {
    type: String,
    default: 'TINFC-SINFC',
  },
  gender: {
    type: String,
    default: 'Laki-Laki',
  },
  phone: {
    type: String,
    default: '628888888',
  },
  address: {
    type: String,
    default: 'FKOM',
  },
  instagram: {
    type: String,
    default: 'pbkfkom_official',
  },
  photo: {
    type: String,
    default: 'avatar.png'
  },
  memberPositionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MemberPositions',
    require: [true, 'Jabatan harus diisi']
  },
  structuralId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Structurals',
    require: [true, 'Struktural harus diisi']
  },
  periodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Periode',
    require: [true, 'Periode harus diisi']
  },
}, 
{
    timestamps: true
 });

module.exports = mongoose.model('Members', membersScheme);