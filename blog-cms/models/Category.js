const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema ({
  id: String,
  catName: String,
  catDesc: String,
  catImgUrl: String,
  catContent: String,
  updated: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Category', CategorySchema);