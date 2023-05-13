const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        role:{type:String,default:'user'}
    },
    { versionKey: false }
);
const User = mongoose.model('user', usersSchema);
module.exports = User;