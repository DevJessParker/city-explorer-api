'use strict';
const axios = require('axios');

function getWeather(req, res) {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const searchQuery = req.query.searchQuery;
  const weatherAPI = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&city=${searchQuery}&units=I`;

  axios.get(weatherAPI)
    .then(weatherResponse => {
      const weatherArray = weatherResponse.data.data.map(forecast => new Forecast(forecast))
      res.status(200).send(weatherArray)
    })
    .catch(err => {
      res.status(500).send(err)
    })

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

module.exports = getWeather;
