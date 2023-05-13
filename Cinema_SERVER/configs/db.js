const mongoose = require('mongoose');
const connectDB = () => {
    mongoose
        .connect('mongodb://127.0.0.1:27017/usersDB', { useNewUrlParser: true })
        .then(() => console.log('Connected to UsersDB!'))
        .catch((error) => console.log(error));
};

module.exports = connectDB;