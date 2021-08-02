"use strict";

const logger = require('../utils/logger');
const stationConversion = require("../utils/station-conversion.js");

const stationAnalytics = {

  getLatestWeather(station) {
    let weatherCode = null;
    let tempF = null;
    let beaufort = null;
    let windCompass = null;
    let chill = null;
    let latestIcon = null;
    let maxTemp = null;
    let minTemp = null;
    if(station.readings.length > 0){
      const latestReading =station.readings[station.readings.length - 1];
      logger.info("Latest readings are: " + latestReading.code);

      weatherCode = stationConversion.convertWeatherCode(latestReading.code);
      latestReading.weatherCode = weatherCode;
    
      tempF = stationConversion.celciusToFahrenheit(latestReading.temperature);
      latestReading.tempF = tempF;

      beaufort = stationConversion.convertToBeaufort(latestReading.windSpeed);
      latestReading.beaufort = beaufort;
      
      windCompass = stationConversion.degreesToCompass(latestReading.windDirection);
      latestReading.windCompass = windCompass;
      
      chill = stationConversion.windChillCalculator(latestReading.temperature, latestReading.windSpeed);
      latestReading.chill = chill;

      latestIcon = stationConversion.convertWeatherIcons(latestReading.code);
      latestReading.latestIcon = latestIcon;
      logger.info("Latest icon is: " + latestIcon);

      maxTemp = stationAnalytics.getMaxTemp(station);
      latestReading.maxTemp = maxTemp;
      logger.info("Max temp;" + maxTemp);

      minTemp = stationAnalytics.getMinTemp(station);
      latestReading.minTemp = minTemp;
      logger.info("Min temp;" + minTemp);
    }
  },

  getMaxTemp(station) {
    let maxTemp = null;
    if (station.readings.length > 0) {
      maxTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature > maxTemp) {
          maxTemp = station.readings[i].temperature;
        }
      }
      return maxTemp;
    }
  },

  getMinTemp(station) {
    let minTemp = null;
    if (station.readings.length > 0) {
      minTemp = station.readings[0].temperature;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].temperature < minTemp) {
          minTemp = station.readings[i].temperature;
        }
      }
      return minTemp;
    }
  }

};

module.exports = stationAnalytics;