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
    let maxWind = null;
    let minWind = null;
    let maxPressure = null;
    let minPressure = null;
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

      maxWind = stationAnalytics.getMaxWind(station);
      latestReading.maxWind = maxWind;
      logger.info("Max wind;" + maxWind);

      minWind = stationAnalytics.getMinWind(station);
      latestReading.minWind = minWind;
      logger.info("Min wind;" + minWind);

      maxPressure = stationAnalytics.getMaxPressure(station);
      latestReading.maxPressure = maxPressure;
      logger.info("Max pressure;" + maxPressure);

      minPressure = stationAnalytics.getMinPressure(station);
      latestReading.minPressure = minPressure;
      logger.info("Min pressure;" + minPressure);
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
  },

  getMaxWind(station) {
    let maxWind = null;
    if (station.readings.length > 0) {
      maxWind = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWind) {
          maxWind = station.readings[i].windSpeed;
        }
      }
      return maxWind;
    }
  },

  getMinWind(station) {
    let minWind = null;
    if (station.readings.length > 0) {
      minWind = station.readings[0].windSpeed;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWind) {
          minWind = station.readings[i].windSpeed;
        }
      }
      return minWind;
    }
  },

  getMaxPressure(station) {
    let maxPressure = null;
    if (station.readings.length > 0) {
      maxPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxPressure) {
          maxPressure = station.readings[i].pressure;
        }
      }
      return maxPressure;
    }
  },

  getMinPressure(station) {
    let minPressure = null;
    if (station.readings.length > 0) {
      minPressure = station.readings[0].pressure;
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minPressure) {
          minPressure = station.readings[i].pressure;
        }
      }
      return minPressure;
    }
  }

};

module.exports = stationAnalytics;