"use strict";

const stationConversion = {
/*
  convertWeatherCode(code) {
    if (code == 100) {
      return "Clear";
    }
    if (code == 200) {
      return "Partial clouds";
    }
    if (code == 300) {
      return "Cloudy";
    }
    if (code == 400) {
      return "Light Showers";
    }
    if (code == 500) {
      return "Heavy Showers";
    }
    if (code == 600) {
      return "Rain";
    }
    if (code == 700) {
      return "Snow";
    }
    if (code == 800) {
      return "Thunder";
    } else {
      return "incorrect";
    }
  },

 */
  convertWeatherCode(code) {
    if (code < 200) {
      return "clear";
    }
    if (code >= 200 && code < 300) {
      return "Thunder";
    }
    if (code >= 300 && code < 500) {
      return "Light Rain";
    }
    if (code >= 500 && code < 600) {
      return "Heavy Rain";
    }
    if (code >= 600 && code < 700) {
      return "Snow";
    }
    if (code >= 700 && code < 800) {
      return "Fog";
    }
    if (code == 800) {
      return "Sunny";
    }
    if (code > 800){
      return "Cloudy"
    } else {
      return "Sunny";
    }
  },

  convertWeatherIcons(code) {
    if (code < 200) {
      return "sun";
    }
    if (code >= 200 && code < 300) {
      return "bolt";
    }
    if (code >= 300 && code < 500) {
      return "cloud sun rain";
    }
    if (code >= 500 && code < 600) {
      return "cloud showers heavy";
    }
    if (code >= 600 && code < 700) {
      return "snowflake";
    }
    if (code >= 700 && code < 800) {
      return "smog";
    }
    if (code == 800) {
      return "sun";
    }
    if (code > 800){
      return "cloud"
    } else {
      return "sun";
    }
  },

  celciusToFahrenheit(temperature) {
    return temperature * 1.8 + 32;
  },

  convertToBeaufort(windspeed) {
    if (windspeed === 0) {
      return 0;
    } else if (windspeed >= 1 && windspeed <= 6) {
      return 1;
    } else if (windspeed >= 7 && windspeed <= 11) {
      return 2;
    } else if (windspeed >= 12 && windspeed <= 19) {
      return 3;
    } else if (windspeed >= 20 && windspeed <= 29) {
      return 4;
    } else if (windspeed >= 30 && windspeed <= 39) {
      return 5;
    } else if (windspeed >= 40 && windspeed <= 50) {
      return 6;
    } else if (windspeed >= 51 && windspeed <= 62) {
      return 7;
    } else if (windspeed >= 63 && windspeed <= 75) {
      return 8;
    } else if (windspeed >= 76 && windspeed <= 87) {
      return 9;
    } else if (windspeed >= 88 && windspeed <= 102) {
      return 10;
    } else if (windspeed >= 103 && windspeed <= 117) {
      return 11;
    } else if (windspeed >= 117) {
      return 12;
    }
    return -1;
  },

  degreesToCompass(deg) {
    if (deg > 11.25 && deg <= 33.75) {
      return "North North East";
    } else if (deg > 33.75 && deg <= 56.25) {
      return "East North East";
    } else if (deg > 56.25 && deg <= 78.75) {
      return "East";
    } else if (deg > 78.75 && deg <= 101.25) {
      return "East South East";
    } else if (deg > 101.25 && deg <= 123.75) {
      return "East South East";
    } else if (deg > 123.75 && deg <= 146.25) {
      return "South East";
    } else if (deg > 146.25 && deg <= 168.75) {
      return "South South East";
    } else if (deg > 168.75 && deg <= 191.25) {
      return "South";
    } else if (deg > 191.25 && deg <= 213.75) {
      return "South South West";
    } else if (deg > 213.75 && deg <= 236.25) {
      return "South West";
    } else if (deg > 236.25 && deg <= 258.75) {
      return "West South West";
    } else if (deg > 258.75 && deg <= 281.25) {
      return "West";
    } else if (deg > 281.25 && deg <= 303.75) {
      return "West North West";
    } else if (deg > 303.75 && deg <= 326.25) {
      return "North West";
    } else if (deg > 326.25 && deg <= 348.75) {
      return "North North West";
    } else {
      return "North";
    }
  },

  windChillCalculator(temperature, windSpeed) {
    return 13.2 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
  },


};
  




module.exports = stationConversion;
