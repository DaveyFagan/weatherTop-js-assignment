"use strict";

const express = require("express");
const router = express.Router();
const accounts = require('./controllers/accounts.js');

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const start = require("./controllers/start.js");
const station = require('./controllers/station.js');


//router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/start", start.index);
router.get("/station/:id", station.index);
router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.get('/station/:id/deletereading/:readingid', station.deleteReading);
router.get("/dashboard/deletestation/:id", dashboard.deleteStation);


router.post('/dashboard/addstation', dashboard.addStation);
router.post('/station-id/:id/addreading', station.addReading);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

module.exports = router;

