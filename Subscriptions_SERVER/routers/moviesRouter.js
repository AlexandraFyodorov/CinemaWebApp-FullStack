const express = require('express');
const moviesBLL = require('../BLL/moviesBLL');

const router = express.Router();

//Entry Point 'http://localhost:8000/movies'

//Get all movies
router.route('/').get(async(req,res)=>{
    const filters = req.query;
    const movies = await moviesBLL.getAllMovies(filters);
    res.json(movies);
});

//Get movie by id
router.route('/:id').get(async(req,res)=>{
    const {id} = req.params;
    const movie = await moviesBLL.getMovieById(id);
    res.json(movie);
})

//Add movie
router.route('/').post(async(req,res)=>{
    const obj = req.body;
    const result = await moviesBLL.addMovie(obj);
    res.json(result);
})

//Update movie
router.route('/:id').put(async(req,res)=>{
    const {id} = req.params;
    const obj = req.body;
    const result = await moviesBLL.updateMovie(id,obj);
    res.json(result);
})

//Delete movie
router.route('/:id').delete(async(req,res)=>{
    const {id} = req.params;
    const result = await moviesBLL.deleteMovie(id);
    res.json(result);
})
module.exports = router;