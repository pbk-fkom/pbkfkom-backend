const mongoose = require('mongoose')
const URLSlugs = require('mongoose-slug-updater');

mongoose.plugin(URLSlugs);

const quotesScheme = mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Members',
  },
  memberPositionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'MemberPositions',
  },
  periodeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Periode',
  },
  content: {
    type: String,
    require: [true, 'Konten harus diisi']
  },
}, 
{
    timestamps: true
 });

module.exports = mongoose.model('Quotes', quotesScheme);