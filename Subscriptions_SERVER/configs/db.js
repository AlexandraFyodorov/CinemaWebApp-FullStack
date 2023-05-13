const mongoose = require('mongoose');
const connectDB = () => {
    mongoose
        .connect('mongodb://127.0.0.1:27017/subscriptionsDB', { useNewUrlParser: true })
        .then(() => console.log('Connected to SubscriptionsDB!'))
        .catch((error) => console.log(error));
};

module.exports = connectDB;