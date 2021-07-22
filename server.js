'use strict';

const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/weather', getWeather)

app.get('*', notFoundHandler);

async function getWeather(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  const weatherAPI = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&city=${searchQuery}&units=I`;

  try {
  const weatherResponse = await axios.get(weatherAPI);
  console.log(weatherResponse)
  const weatherArray = weatherResponse.data.data.map(forecast => new Forecast(forecast))
  res.status(200).send(weatherArray)
  console.log("Final Array", weatherArray);
  } catch (error) {
  res.status(500).send(weatherArray)
  }
}

function notFoundHandler(req, res) {
  res.status(404).send('ERROR: Something went wrong');
}

class Forecast {
  constructor(obj) {
  this.icon = `https://www.weatherbit.io/static/img/icons/` + `${obj.weather.icon}` + `.png`
  this.date = obj.datetime,
  this.mintemp = obj.min_temp,
  this.maxtemp = obj.max_temp,
  this.description = obj.weather.description
  }
};
    

  // const city = weatherData.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase());
  // const newData = city.data.map(element => ({ description: element.weather.description, date: element.datetime }));
  // console.log("newData", newData)

  // if (city) {
  //   res.status(200).send(newData);
  // } else {
  //   res.status(500).send("ERROR: Something went wrong.");
  // }

 
app.listen(PORT, () => {
  console.log(`Proof of life on port ${PORT}`);
});