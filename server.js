'use strict'

// importing libraries and source code allowing methods to be used on those variables
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const app = express();
const cors = require('cors');

// Taking PORT from .env
const PORT = process.env.PORT || 3000;

//request comes from front end via user input, response is data server sends back
function handleLocation( request, response) {
  let cityQuery = request.query.city; // input from user
  const locationKey = process.env.LOCATIONIQ_API_KEY; // api key
  const locationURL = `https://us1.locationiq.com/v1/search.php?key=${locationKey}&q=${cityQuery}&format=json&limit=1` // location API url
  superagent.get(locationURL)
    .then( locationResponse => {
      const data = locationResponse.body;
      data.map( idx => {
        if (idx.display_name.search(cityQuery)) {
          const location = new Location(cityQuery, idx)
          response.send(location);
        }
      })
    })
    .catch( error => {
      handleError('this location does not exist', request, response);
    });
}

// creates location objects
function Location(city, data) {
  this.search_query = city;
  this.formatted_query = data.display_name;
  this.latitude = data.lat;
  this.longitude = data.lon;
}

// handleError('something is wrong', request, response)
// Gets location data
function handleWeather(request, response) {
  let {latitude, longitude} = request.query;
  const weatherKey = process.env.WEATHERBIT_API_KEY;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lang=en&units=I&days=8&lat=${latitude}&lon=${longitude}`;
  
  superagent.get(weatherUrl)
    .then(value => {
      const weather = value.body.data;
      
      response.send(weather.map( idx => {
        return new Forecast(idx.datetime, idx.weather.description)
      }));
    })
    .catch(error => {
      handleError('weather error', request, response, next)
    });
}

// creates weather objects
function Forecast(date, forecast) {
  this.forecast = forecast;
  this.time = new Date(date).toDateString();
}

// Gets weather data
function handleError(error, request, response, next) {
  response.status(500).send(error);
}

// using express to call
app.use(cors());
app.get('/location', handleLocation);
app.get('/weather', handleWeather)
app.use(handleError);


// Start our server, and listen for requests
app.listen(PORT, () => {
  console.log('App is running on PORT' + PORT)
});
