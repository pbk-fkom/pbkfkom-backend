const mongoose = require('mongoose')

const settingsScheme = mongoose.Schema({
  key: {
    type: String
  },
  value: {
    type: String
  },
}, 
{
    timestamps: true
 });

module.exports = mongoose.model('Settings', settingsScheme);