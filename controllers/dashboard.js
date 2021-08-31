"use strict";

const logger = require("../utils/logger");
const stationConversion = require("../utils/station-conversion.js");
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const stationAnalytics = require("../utils/station-analytics.js");
const _ = require('lodash');



const dashboard = {
    index(request, response) {

        logger.info("dashboard rendering");
        const loggedInUser = accounts.getCurrentUser(request);
        const alpha = stationStore.getUserStations(loggedInUser.id).sort(function (a,b){
            return a.name.localeCompare(b.name);
        });
        logger.info(alpha);


        console.log("Stations are: " + alpha);

        let latestWeather = null;
        for(let i = 0; i < alpha.length; i++){
                latestWeather = stationAnalytics.getLatestWeather(alpha[i]);
                console.log("Latest weather is: " + latestWeather);
        }


        const viewData = {
            title: "WeatherTop Dashboard",
            stations: alpha,
            latestWeather: latestWeather
        };
        logger.info("about to render", stationStore.getAllStations());
        response.render("dashboard", viewData);
    },

    addStation(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        const newStation = {
            id: uuid.v1(),
            userid: loggedInUser.id,
            name: request.body.name,
            lat: request.body.lat,
            lng: request.body.lng,
            readings: []
        };
        logger.debug('Creating a new Station', newStation);
        stationStore.addStation(newStation);
        response.redirect('/dashboard');
    },

    deleteStation(request, response) {
        const stationId = request.params.id;
        logger.debug(`Deleting Station ${stationId}`);
        stationStore.removeStation(stationId);
        response.redirect("/dashboard");
    },
};

module.exports = dashboard;

