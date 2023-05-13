const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    name: String,
    genres:[String],
    image: String,
    premiered: Date
  },
  { versionKey: false }
);
const Movie = mongoose.model('movie', movieSchema);
module.exports = Movie;