'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const stationAnalytics = require("../utils/station-analytics.js");


const station = {
  index(request, response) {
    
    const stationId = request.params.id;
    logger.info('Station id = ' + stationId);
    
    const station = stationStore.getStation(stationId);
    logger.info('Station = ' + station);
    
    const latestWeather = stationAnalytics.getLatestWeather(station);
    
    const viewData = {
      title: 'Station',
      station: stationStore.getStation(stationId),
    };
    response.render('station-id', viewData);
  },
  
  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;