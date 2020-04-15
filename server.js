'use strict'

// importing libraries and source code allowing methods to be used on those variables
require('dotenv').config();
const express = require('express');
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

//request comes from front end via user input, response is data server sends back
function handleLocation( request, response) {
  let location;
  const locationData = require('./data/geo.json');
  const cityQuery = request.query.city; // input from user
  console.log(cityQuery, 'cityQuery')

  for (let i in locationData) {
    if (locationData[i].display_name.toLowerCase().includes(cityQuery.toLowerCase())) {
      location = new Location(cityQuery, locationData[i])
      response.status(200).send(location);
      console.log(location, 'test location')
    } 
  }
  if (typeof location !== 'undefined') {
    response.status(200).send(location);
  } else {
    throw new Error('BROKEN');
  }
  // const latitude = jsonData[0].lat;
  // const longitude = jsonData[0].lon;
  // response.send('Woops');
}

// handleError('something is wrong', request, response)

function Forecast(date, forecast) {
  this.forecast = forecast;
  this.time = new Date(date).toDateString();
}

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
