'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const stationAnalytics = require("../utils/station-analytics.js");
const uuid = require("uuid");
const _ = require('lodash');



const station = {
  index(request, response) {

    const stationId = request.params.id;
    logger.info('Station id = ' + stationId);

    const station = stationStore.getStation(stationId);
    logger.info('Station = ' + station);

    const getLatestWeather = stationAnalytics.getLatestWeather(station);
    //const maxTemp = stationAnalytics.getMaxTemp(station);
   // logger.info("max temp is: " + maxTemp);

    const viewData = {
      title: 'Station',
      station: stationStore.getStation(stationId),
      getLatestWeather: getLatestWeather,
      //maxtemperature: maxTemp,
    };
    response.render('station-id', viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    var today = new Date();
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      windDirection: request.body.windDirection,
      pressure: request.body.pressure,
      date:today.toLocaleString()
    };
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.info(`Deleting reading ${readingId} from station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;