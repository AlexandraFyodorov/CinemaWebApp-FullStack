const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name: String,
    email:String,
    city: String
  },
  {versionKey: false}
);
const Member = mongoose.model('Member', memberSchema);
module.exports = Member;