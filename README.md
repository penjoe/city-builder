# City Builder

### **Author**:
Joe Pennock - Full-stack JavaScript Developer - [GitHub](https://github.com/penjoe)

### **Version**:
- 1.0.0 - initialization
- 1.1.0 - test server created
- 1.2.0 - added function to handle errors
- 2.0.0 - refactored weather data format
- 2.1.0 - added a location api to get lat/lon locations
- 2.2.0 - added a weather api to get current weather for location entered
- 2.3.0 - added a trails api to get a list of local hikes for location entered
- 3.0.0 - added SQL database to save previous location queries
- 3.0.1 - installed pg dependencies, set up db framework
- 3.1.0 - initialized database, added schema.sql file 
- 3.2.0 - populate database with data pulled from API
- 3.2.1 - added connection to db
- 3.2.2 - db connection successful, rendering to page, not storing data
- 3.3.0 - db connection successful, rendering to page, successfully storing data in db, deployed to Heroku
- 4.0.0 - added a movies api to get movie data for the location entered
- 4.1.0 - added yelp api to pull restaurants for location entered
<!-- (increment the patch/fix version number if you make more commits past your first submission) -->

###  Progress 
Here's the projects [Trello](https://trello.com/b/S1cbilFm/city-builder-api) board
## Overview
The purpose of this application is to give the user an easy means of finding activities to do for a given city location. By entering a cty, the user will get a list of food options, movies and weather for that given area, making it easier to help plan trips.

This app was created as a Code Fellows 301 class project with the purpose of learning how to create and deploy back-end servers. 

## Getting Started
To build this app yourself, here are the steps you need to take:
1. Make a github repository to store your work, clone that repo to local
2. Make requests for API keys for these services:
    - [LocationIQ](https://locationiq.com/)
    - [Yelp](https://www.yelp.com/developers/documentation/v3/business_search)
    - [The Movie DB](https://developers.themoviedb.org/3/getting-started/introduction)
3. Setup a a Trello board or some other workflow assistance tool
4. Setup a server for the app's backend
5. Deploy the server using [Heroku](https://www.heroku.com/)

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
This project was built with:
- Node.js
- cors
- Express
- dotenv
- superagent
- postgre SQL

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:
01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->
- 04-14-2020 11:28am - Project repository setup: [GitHub PR](https://github.com/penjoe/city-builder/pull/1)
- 04-14-2020 12:56pm - deploy to Heroku [GitHub PR](https://github.com/penjoe/city-explorer-api/pull/2)
- 04-14-2020 11:32pm - test server.js created [GitHub PR](https://github.com/penjoe/city-explorer-api/pull/3)
- 04-15-2020 9:45am - add error handling to server [GitHub PR](https://github.com/penjoe/city-explorer-api/pull/5)
- 04-15-2020 10:55am - reformated weather data -  [GitHub PR](https://github.com/penjoe/city-explorer-api/pull/7)
- 04-15-2020 12:30pm - pull location from API -  [GitHub PR](https://github.com/penjoe/city-explorer-api/pull/8)
- 04-15-2020 11:55pm - pull weather from API -  [GitHub PR](https://github.com/penjoe/city-explorer-api/pull/9)
- 04-16-2020 03:00am - get trails list from API -  [GitHub PR](https://github.com/penjoe/city-explorer-api/pull/10)
- 04-16-2020 12:154am - SQL DB setup -  [GitHub PR](https://github.com/penjoe/city-explorer-api/pull/12)
- 04-19-2020 4:52pm - populate database with data pulled from API query, deployed to Heroku -  [GitHub PR](https://github.com/penjoe/city-explorer-api/pull/14)
- 04-20-2020 - added movies api - [GitHib PR](https://github.com/penjoe/city-explorer-api/pull/16)
- 04-20-2020 - added yelp api - [GitHib PR](https://github.com/penjoe/city-explorer-api/pull/17)

## Collaborators
- [Matthew Stewart](https://github.com/matthewadamstewart) :  pair programming partner 04/14/2020
- [Volha Charnysh](https://github.com/charnysho) ; pair programming partner 04/15/2020, 4/16/2020 
- [Peyton Cysewski](https://github.com/Peyton-Cysewski) : pair programming partner 04/15/2020, 4/16/2020

## Time Estimates
- Number and name of feature: Feature #1 Setup Repo and workflow
- Estimate of time needed to complete: 2 hours
- Start time: 9:00am 4/14/2020
- Finish time: 11:30am 4/14/2020
- Actual time needed to complete: 2.5 hours
<hr>

- Number and name of feature: Feature #2 Deploy to Heroku
- Estimate of time needed to complete: 3 hours
- Start time: 11:30am 4/14/2020
- Finish time: 4:30pm 4/14/2020
- Actual time needed to complete: 5 hours
<hr>

- Number and name of feature: Feature #3 refactor data
- Estimate of time needed to complete: 2
- Start time: 9:30am 4/15/2020
- Finish time: 11:00 4/15/2020
- Actual time needed to complete: 1.5 hours
<hr>

- Number and name of feature: Feature #4 add location api
- Estimate of time needed to complete: 2
- Start time: 11:00am 4/15/2020
- Finish time: 12:30pm 4/15/2020
- Actual time needed to complete: 1.5 hours
<hr>

- Number and name of feature: Feature #5 add weather api
- Estimate of time needed to complete: 2.5
- Start time: 9:00pm 4/14/2020
- Finish time: 12:00am 4/16/2020
- Actual time needed to complete: 3 hours
<hr>

- Number and name of feature: Feature #6 add trails api
- Estimate of time needed to complete: 3 hours
- Start time: 12:30am 4/16/2020
- Finish time:  3:00 am 4/16/2020
- Actual time needed to complete: 2.5 hours
<hr>

- Number and name of feature: Feature #7 add SQL database
- Estimate of time needed to complete: 2 hours
- Start time: 11:00am 4/16/2020
- Finish time: 11:33pm 4/16/2020
- Actual time needed to complete: 3 hours
<hr>

- Number and name of feature: Feature #8 populate SQL database
- Estimate of time needed to complete: 3 hours
- Start time: 11:41pm 4/16/2020
- Finish time: 4:52pm 4/19/2020
- Actual time needed to complete: 6 hours
<hr>

- Number and name of feature: Feature #9 add movies api
- Estimate of time needed to complete: 2 hours
- Start time: 2:30am 4/20/2020
- Finish time: 3:51am 4/20/2020
- Actual time needed to complete: 1.5 hours
<hr>

- Number and name of feature: Feature #10 add yelp api
- Estimate of time needed to complete: 1.5 hours
- Start time: 3:55am 04/20/2020
- Finish time: 4:35am 04/20/2020
- Actual time needed to complete: 40 minutes
<hr>