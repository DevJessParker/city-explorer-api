'use strict';
const axios = require('axios');
const checkCache = require('./movies.js');

function getMovies(req, res) {
  const searchQuery = req.query.searchQuery;
  const movieAPI = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
  
  checkCache(searchQuery)
    .then(moviesList => res.send(moviesList))
    .catch(err => console.error(err));

  
  axios.get(movieAPI)
    .then(movieResponse => {
      const movieArray = movieResponse.data.results
      .map(movie => new Movie(movie));
      movieArray.sort((a, b) => b.averageVotes - a.averageVotes)
      res.status(200).send(movieArray)
    })
    .catch(err => {
      res.status(500).send(err)
    })
};

class Movie {
  constructor(obj) {
    this.title = obj.title,
    this.poster = `https://image.tmdb.org/t/p/w500` + `${obj.poster_path}`,
    this.date = obj.release_date
    this.overview = obj.overview,
    this.popularity = obj.popularity,
    this.averageVotes = obj.vote_average,
    this.totalVotes = obj.vote_count

  }
}



module.exports = getMovies;