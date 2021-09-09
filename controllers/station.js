'use strict';

const logger = require('../utils/logger');
const stationStore = require('../models/station-store.js');
const stationAnalytics = require("../utils/station-analytics.js");
//const stationConversion = require("../utils/station-conversion.js");
const uuid = require("uuid");
const _ = require('lodash');
const axios = require("axios");
//const oneCallRequest = `https://api.openweathermap.org/data/2.5/onecall?lat=52.160858&lon=-7.152420&units=metric&appid=3261569696a6a35939cf9e8d8cb03127`

const station = {
    index(request, response) {
        const stationId = request.params.id;
        logger.info('Station id = ' + stationId);
        const station = stationStore.getStation(stationId);
        logger.info('Station = ' + station);
        const getLatestWeather = stationAnalytics.getLatestWeather(station);
        console.log("get latest weather is: " + getLatestWeather);

        const viewData = {
            title: 'Station',
            station: stationStore.getStation(stationId),
            getLatestWeather: getLatestWeather,
        };
        response.render('station-id', viewData);
    },

    async addreport(request, response) {
        const stationId = request.params.id;
        logger.info("rendering new report");
        const currentStation = stationStore.getStation(stationId);
        const stationLat = currentStation.lat;
        const stationLng = currentStation.lng;
        const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${stationLat}&lon=${stationLng}&units=metric&appid=3261569696a6a35939cf9e8d8cb03127`
        console.log("Station latitude is : " + stationLat);
        console.log("Station longitude is : " + stationLng);
        let report = {};
        var today = new Date();
        const result = await axios.get(requestUrl);
        if (result.status == 200) {
            console.log(result.data);
            const reading = result.data.current;
            report.date = today.toLocaleString();
            report.code = reading.weather[0].id;
            report.temperature = reading.temp;
            report.windSpeed = reading.wind_speed;
            report.pressure = reading.pressure;
            report.windDirection = reading.wind_deg;
            report.id = uuid.v1();
        }
        console.log(report);
        stationStore.addReading(stationId, report);
        const station = stationStore.getStation(stationId);
        const getLatestWeather = stationAnalytics.getLatestWeather(station);
        const viewData = {
            station: stationStore.getStation(stationId),
            getLatestWeather: getLatestWeather,
            title: 'Station ',
            reading: report
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
            date: today.toLocaleString()
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

    async tempTrend(request, response) {
        const stationId = request.params.id;
        logger.info("rendering new report");
        const currentStation = stationStore.getStation(stationId);
        const stationLat = currentStation.lat;
        const stationLng = currentStation.lng;
        const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${stationLat}&lon=${stationLng}&units=metric&appid=3261569696a6a35939cf9e8d8cb03127`
        console.log("Station latitude is : " + stationLat);
        console.log("Station longitude is : " + stationLng);
        let report = {};
        const result = await axios.get(requestUrl);
        if (result.status == 200) {
            report.tempTrend = [];
            report.windspeedTrend = [];
            report.pressureTrend = [];
            report.trendLabels = [];
            const trends = result.data.daily;
            console.log("Result.data.daily: " + trends[0].dt * 1000);
            for (let i = 0; i < trends.length; i++) {
                report.tempTrend.push(trends[i].temp.day);
                report.windspeedTrend.push(trends[i].wind_speed);
                report.pressureTrend.push(trends[i].pressure);
                const date = new Date(trends[i].dt * 1000);
                console.log(date);
                report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
            }
        }
        console.log(report);
        const station = stationStore.getStation(stationId);
        const viewData = {
            station: stationStore.getStation(stationId),
            title: 'Station ',
            reading: report
        };
        response.render('station-id', viewData);
    },

};

module.exports = station;