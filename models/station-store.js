'use strict';

const _ = require("lodash");
const JsonStore = require("./json-store");

const stationStore = {

  store: new JsonStore("./models/station-store.json", {
    stationCollection: []
  }),
  collection: "stationCollection",

  getAllStations() {
    return this.stationCollection;
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);
  },

  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
    // TODO : remove the song with id songId from the playlist
  },
};

module.exports = stationStore;