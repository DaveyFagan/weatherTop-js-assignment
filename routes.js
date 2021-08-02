"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const start = require("./controllers/start.js");
const station = require('./controllers/station.js');


router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/start", start.index);
router.get("/station/:id", station.index);

router.post('/dashboard/addstation', dashboard.addStation);
router.post('/station-id/:id/addreading', station.addReading);

module.exports = router;
