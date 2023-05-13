const moviesDB = require('../models/moviesModel')

//Get All
const getAllMovies = async (filters) => {
  return moviesDB.find(filters);
}

// GET - Get By Id
const getMovieById = async (id) => {
  return moviesDB.findById({ _id: id });
};


// POST - Create in DB
const addMovie = async (obj) => {
  const mov = new moviesDB(obj);
  const savedMovie = await mov.save();
  const newMovieId = savedMovie._id;
  return newMovieId;
};

// PUT - Update
const updateMovie = async (id, obj) => {
  await moviesDB.findByIdAndUpdate(id, obj);
  return 'Movie Updated!';
};

// DELETE - Delete
const deleteMovie = async (id) => {
  await moviesDB.findByIdAndDelete(id);
  return 'Movie Deleted!';
};

module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie,  }