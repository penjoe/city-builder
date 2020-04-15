'use strict'

// importing libraries and source code allowing methods to be used on those variables
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const app = express();
const cors = require('cors');

// Taking PORT from .env
const PORT = process.env.PORT || 3000;

function Location(city, data) {
  this.search_query = city;
  this.formatted_query = data.display_name;
  // this.latitude = data.lat;
  // this.longitude = data.lon;
}

function Forecast(date, forecast) {
  this.forecast = forecast;
  this.time = new Date(date).toDateString();
}

//request comes from front end via user input, response is data server sends back
function handleLocation( request, response) {
  let cityQuery = request.query.city; // input from user
  const key = process.env.LOCATIONIQ_API_KEY; // api key
  const locationURL = `https://us1.locationiq.com/v1/search.php?key=${key}&q=${cityQuery}&format=json&limit=1` // location API url

  superagent.get(locationURL)
    .then( locationResponse => {
      const data = locationResponse.body;
      data.map( idx => {
        console.log('.map parameter', idx)
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

// handleError('something is wrong', request, response)


function handleWeather(request, response) {
  const weatherData = require('./data/darksky.json').daily.data;

  const results = [];
  weatherData.map(item => results.push(new Forecast(item.time, item.summary)))
  response.send(results);
}

function handleError(error, request, response, next) {
  response.status(500).send({
    status: 500,
    responseTest: 'sorry, something went wrong',
  });
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
