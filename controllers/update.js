"use strict";

const logger = require("../utils/logger");
const stationStore = require('../models/station-store.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const userStore = require('../models/user-store.js');

const update = {
    index(request, response) {
        logger.info("update rendering");
        const userId = request.params.id;
        const viewData = {
            title: "Update profile",
            user: userStore.getUserById(userId),
        };
        logger.info("about to render", userStore.getUserById(userId));
        response.render("update", viewData);
    },

    update(request, response) {
        const userId = request.params.id;
        const user = userStore.getUserById(userId);
        const newUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            password: request.body.password
        };
        logger.info(`Updating user ${user}`);
        stationStore.updateUser(user, newUser);
        response.redirect("/update" );
    }
};

module.exports = update;

