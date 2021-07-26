'use strict';

const axios = require('axios')
const cache = require('./cache.js');

function checkCache(searchQuery) {
  const key = 'movies-' + searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&page=1&query=${searchQuery}`;

  if(!cache[key]) {
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then(data => parseMovieData(data.data))
  }
  console.log(cache[key].data)
  return cache[key].data

}

function parseMovieData(data) {
  try {
    const movies = data.results.map(movie => {
      return new Movie(movie);
    })
      return Promise.resolve(movies);
  } catch (err) {
      return Promise.reject(err);
  }
}

class Movie {
  constructor(obj) {
    this.title = obj.title,
    this.poster = `https://image.tmdb.org/t/p/w500` + `${obj.poster_path}`,
    this.date = obj.release_date,
    this.overview = obj.overview,
    this.popularity = obj.popularity,
    this.averageVotes = obj.vote_average,
    this.totalVotes = obj.vote_count,
    this.timestamp = Date.now()
  }
}


module.exports = checkCache;