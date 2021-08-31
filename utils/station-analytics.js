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
    let tempTrend = null;
    let pressureTrend = null;
    let windSpeedTrend = null;
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

      tempTrend = stationAnalytics.getTempTrend(station);
      latestReading.tempTrend = tempTrend;
      logger.info("Temperature trend: " + tempTrend);

      pressureTrend = stationAnalytics.getPressureTrend(station);
      latestReading.pressureTrend = pressureTrend;
      logger.info("Pressure trend: " + pressureTrend);

      windSpeedTrend = stationAnalytics.getWindSpeedTrend(station);
      latestReading.windSpeedTrend = windSpeedTrend;
      logger.info("WindSpeed trend: " + windSpeedTrend);
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
  },

  getTempTrend(station) {
    let trend = null;
    if (station.readings.length > 0) {
      if (station.readings.length > 1) {
        if (station.readings[station.readings.length - 2].temperature < station.readings[station.readings.length - 1].temperature) {
          trend = "arrow up";
        } else if (station.readings[station.readings.length - 2].temperature > station.readings[station.readings.length - 1].temperature) {
          trend = "arrow down";
        } else {
          trend = "minus";
        }
      }
      if (station.readings.length > 2) {
        if (station.readings[station.readings.length - 3].temperature < station.readings[station.readings.length - 2].temperature && station.readings[station.readings.length - 2].temperature < station.readings[station.readings.length - 1].temperature) {
          trend = "arrow up";
        } else if (station.readings[station.readings.length - 3].temperature > station.readings[station.readings.length - 1].temperature && station.readings[station.readings.length - 2].temperature > station.readings[station.readings.length - 1].temperature) {
          trend = "arrow down";
        } else {
          trend = "minus";
        }
      }
    }
    return trend;
  },

  getPressureTrend(station) {
    let trend = null;
    if (station.readings.length > 0) {
      if (station.readings.length > 1) {
        if (station.readings[station.readings.length - 2].pressure < station.readings[station.readings.length - 1].pressure) {
          trend = "arrow up";
        } else if (station.readings[station.readings.length - 2].pressure > station.readings[station.readings.length - 1].pressure) {
          trend = "arrow down";
        } else {
          trend = "minus";
        }
      }
      if (station.readings.length > 2) {
        if (station.readings[station.readings.length - 3].pressure < station.readings[station.readings.length - 2].pressure && station.readings[station.readings.length - 2].pressure < station.readings[station.readings.length - 1].pressure) {
          trend = "arrow up";
        } else if (station.readings[station.readings.length - 3].pressure > station.readings[station.readings.length - 2].pressure && station.readings[station.readings.length - 2].pressure > station.readings[station.readings.length - 1].pressure) {
          trend = "arrow down";
        } else {
          trend = "minus";
        }
      }
    }
    return trend;
  },

  getWindSpeedTrend(station) {
    let trend = null;
    if (station.readings.length > 0) {
      if (station.readings.length > 1) {
        if (station.readings[station.readings.length - 2].windSpeed < station.readings[station.readings.length - 1].windSpeed) {
          trend = "arrow up";
        } else if (station.readings[station.readings.length - 2].windSpeed > station.readings[station.readings.length - 1].windSpeed) {
          trend = "arrow down";
        } else {
          trend = "minus";
        }
      }
      if (station.readings.length > 2) {
        if (station.readings[station.readings.length - 3].windSpeed < station.readings[station.readings.length - 2].windSpeed && station.readings[station.readings.length - 2].windSpeed < station.readings[station.readings.length - 1].windSpeed) {
          trend = "arrow up";
        } else if (station.readings[station.readings.length - 3].windSpeed > station.readings[station.readings.length - 2].windSpeed && station.readings[station.readings.length - 2].windSpeed > station.readings[station.readings.length - 1].windSpeed) {
          trend = "arrow down";
        } else {
          trend = "minus";
        }
      }
    }
    return trend;
  },


/*
  calcTrend(station, ...values) {
  let trend = 0;
  if (values.length > 2) {
    if (( values[2] > values[1] ) && (values[1] > values[0])) {
      trend = 1;
    } else if (( values[2] < values[1] ) && (values[1] < values[0])) {
      trend = -1;
    }
  }
  return trend;
},

  tempTrend(station, ...readings) {
  let trend = 0;
  if (station.readings.length() > 2) {
    let values = station.readings.temperature.slice(Math.max(station.readings.temperature.length - 3,0));
    trend = calcTrend(values);
  }
  return trend;
}
*/
};

module.exports = stationAnalytics;