
var grafanaService = require("../services/grafanaService.js");

exports.createGrafanaSettings = async function (req, res) {
    try {
        let jenkins = await grafanaService.createGrafanaSettings(req.headers["token"], req);
        res.status(200).send({ jenkins });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.getGrafanaSettings = async function (req, res) {
    try {
        let jenkins = await grafanaService.getGrafanaSettings(req.headers["token"], req);
        res.status(200).send(jenkins);
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.deleteGrafanaSettings = async function (req, res) {
    try {
        let jenkins = await grafanaService.deleteGrafanaSettings(req.headers["token"], req);
        res.status(200).send({ jenkins });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};
exports.deleteGrafanaSetting = async function (req, res) {
    try {
        let jenkins = await grafanaService.deleteGrafanaSetting(req.headers["token"], req);
        res.status(200).send({ jenkins });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};

