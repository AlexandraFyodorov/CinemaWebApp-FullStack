const axios = require('axios');
const moviesDB = require('../models/moviesModel')

const getAllMovies = async () => {
    const { data: moviesWeb } = await axios.get('https://api.tvmaze.com/shows');

    moviesWeb.forEach(async(element) => {
      const obj = new moviesDB({
        name: element.name,
        genres: element.genres,
        image:element.image.medium,
        premiered:element.premiered
      });
      await obj.save();
    });
}
    
module.exports =  getAllMovies ;