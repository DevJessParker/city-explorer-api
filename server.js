'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(express.json());

const getWeather = require('./routes/get-weather.js');
const getMovies = require('./routes/get-movies.js');
const notFoundHandler = require('./routes/not-found.js');

const PORT = process.env.PORT || 3001;

app.get('/weather', getWeather);
app.get('/movies', getMovies);
app.get('*', notFoundHandler);

 
app.listen(PORT, () => {
  console.log(`Proof of life on port ${PORT}`);
});