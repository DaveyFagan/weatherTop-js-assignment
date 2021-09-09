"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store.js');
//const uuid = require('uuid');
const accounts = require ('./accounts.js');
const userStore = require('../models/user-store.js');

const update = {
    index(request, response) {
        logger.info("update rendering");
        const loggedInUser = accounts.getCurrentUser(request);
        const user = userStore.getUserByEmail(loggedInUser.email);
        const viewData = {
            title: "Update profile",
            user: user,
        };
        logger.info("about to render", user);
        response.render("update", viewData);
    },

    update(request, response) {
        const loggedInUser = accounts.getCurrentUser(request);
        const user = userStore.getUserByEmail(loggedInUser.email);
        const b = request.body;
        logger.info("User: " + user);
        //user.id = uuid.v1();
        const newUser = {
            firstname: request.body.firstname,
            lastname: request.body.lastname,
            email: request.body.email,
            password: request.body.password
        };
        logger.info(`Updating user ${user}`);
        stationStore.updateUser(user, newUser);
        response.redirect("/update" );
    }
};

module.exports = update;