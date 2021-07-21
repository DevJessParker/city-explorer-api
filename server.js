'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;

  const city = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
  const newData = city.data.map(element => ({ description: element.weather.description, date: element.datetime }));
  console.log(newData)

  if (city) {
    res.status(200).send(newData);
  } else {
    res.status(500).send("ERROR: Something went wrong.");
  }


  app.listen(PORT, () => {
    console.log(`Proof of life on port ${PORT}`);
  });

});