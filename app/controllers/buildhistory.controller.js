const db = require("../models");

var BuildHistoryService = require("../services/buildHistoryService.js");

exports.createbuildhistory = async function (req, res) {
    try {
        let createBuildHistory = await BuildHistoryService.createBuildHistory(req.headers["token"], req);
        res.status(200).send({ createBuildHistory });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }
};

exports.updatebuildhistory = async function (req, res) {
    try {
        let updateBuildHistory = await BuildHistoryService.updateBuildHistory(req.headers["token"], req);
        res.status(200).send({ updateBuildHistory });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not update build history" + e });
    }
};

exports.getbuildhistory = async function (req, res) {
    try {
        let buildHistories = await BuildHistoryService.getBuildHistory(req.headers["token"], req);
        res.status(200).send({ buildHistories });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not get the build history" + e });
    }
};