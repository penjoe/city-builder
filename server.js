'use strict'

// importing libraries and source code to dependencies allowing methods to be used on those variables
require('dotenv').config();
const express = require('express');
const superagent = require('superagent');
const pg = require('pg')
const cors = require('cors');

// Taking PORT from .env
const PORT = process.env.PORT || 3000;

// initiates express and psql database
const app = express();
const dbClient = new pg.Client(process.env.DATABASE_URL);

// sets connection to database
dbClient.connect(error => {
  if (error) {
    console.error('Connect to database: Failed', error.stack)
  } else {
    console.log('Connect to database: Success')
  }
})

// creates location objects
function Location(city, data) {
  this.search_query = city;
  this.formatted_query = data.display_name;
  this.latitude = data.lat;
  this.longitude = data.lon;
}

// creates weather objects
function Forecast(date, forecast) {
  this.forecast = forecast;
  this.time = new Date(date).toDateString();
}

// Creates weather objects
function Trails(idx) {
  this.name = idx.name;
  this.location = idx.location;
  this.length = idx.length;
  this.stars = idx.stars;
  this.star_votes = idx.starVotes;
  this.summary = idx.summary;
  this.trail_url = idx.url;
  this.conditions = idx.conditionDetails;
  this.condition_date = idx.conditionDate.slice(0, 10);
  this.condition_time = idx.conditionDate.slice(11, 19);
}

// Creates movies objects
function Movies(idx) {
  this.title = idx.title;
  this.overview = idx.overview;
  this.average_votes = idx.vote_average;
  this.total_votes = idx.vote_count;
  this.image_url = `https://image.tmdb.org/t/p/w500${idx.backdrop_path}`;
  this.popularity = idx.popularity;
  this.released_on = idx.release_date;
}

// Gets location data
//request comes from front end via user input, response is data server sends back
function handleLocation( request, response, next) {

  const cityQuery = request.query.city; // input from user
  const locationKey = process.env.LOCATIONIQ_API_KEY; // api key
  const locationURL = `https://us1.locationiq.com/v1/search.php?key=${locationKey}&q=${cityQuery}&format=json&limit=1` // location API url

  let searchSQL = `SELECT * FROM locations WHERE search_query=$1;`;
  let searchValues = [cityQuery];

  dbClient.query(searchSQL, searchValues)
    .then(sqlResults => {
      if (sqlResults.rows[0]) {
        response.status(200).send(sqlResults.rows[0]);
      } else {
        superagent.get(locationURL)
          .then(locationResponse => {
            let location = new Location(cityQuery, locationResponse.body[0]);
            let insertSQL = `INSERT INTO locations (search_query, formatted_query, latitude, longitude) Values ($1, $2, $3, $4) RETURNING *`;
            let insertValues = [location.search_query, location.formatted_query, location.latitude, location.longitude];
            dbClient.query(insertSQL, insertValues)
            
            response.status(200).send(location)
          })
          .catch(error => {handleError(error, request, response, next)});
      }
    })
    .catch(error => {handleError(error, request, response, next)});
}

// Gets weather data
function handleWeather(request, response, next) {
  let {latitude, longitude} = request.query;
  const weatherKey = process.env.WEATHERBIT_API_KEY;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${weatherKey}&lang=en&units=I&days=7&lat=${latitude}&lon=${longitude}`;
  
  superagent.get(weatherUrl)
    .then(weatherResponse => {
      const weather = weatherResponse.body.data;
      
      response.send(weather.map( idx => {
        return new Forecast(idx.datetime, idx.weather.description)
      }));
    })
    .catch( error => {
      handleError('the weather is on vacation', request, response, next)
    });
}

// get hiking trails data
function handleTrails(request, response, next) {
  let {latitude, longitude} = request.query;
  const trailsKey = process.env.TRAILS_API_KEY;
  const trailsUrl = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=10&key=${trailsKey}`

  superagent.get(trailsUrl)
    .then( trailsResponse => {
      const trails = trailsResponse.body.trails;
      let hikes = trails.map( idx => {
        return new Trails(idx)
      });
      response.status(200).send(hikes);
    })
    .catch( error => {
      handleError('these are not the trails you are looking for', request, response, next)
    });
}

// get movies data
function handleMovies(request, response, next) {
  let city = request.query.search_query;
  const moviesKey = process.env.MOVIE_API_KEY;
  const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${moviesKey}&query=${city}`;

  superagent.get(moviesUrl)
    .then( moviesResponse => {
      let moviesData = moviesResponse.body.results;
      console.log('test')
      response.status(200).send(moviesData.map( idx => new Movies(idx)
      ));
    })
    .catch( error => handleError('This movie is rated B for broken', request, response, next));
}

// error handlers
function routeError(error, request, response, next) {
  response.status(404).send('Route not found')
}

function handleError(error, request, response, next) {
  response.status(500).send(error);
}

// using express to call
app.use(cors());
app.get('/location', handleLocation);
app.get('/weather', handleWeather);
app.get('/trails', handleTrails);
app.get('/movies', handleMovies)
app.use(handleError);
app.use('*', routeError)


// Start our server, and listen for requests
app.listen(PORT, () => {
  console.log('App is running on PORT' + PORT)
});