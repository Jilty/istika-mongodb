
var jenkinsService = require("../services/jenkinsService.js");

exports.createJenkinsSettings = async function (req, res) {
    try {
        let jenkins = await jenkinsService.createJenkinsSettings(req.headers["token"], req);
        res.status(200).send({ jenkins });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.getjenkinsSettings = async function (req, res) {
    console.log("controller",req)

    try {
        let jenkins = await jenkinsService.getJenkinsSettings(req.headers["token"], req);
        res.status(200).send(jenkins);
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.deletejenkinsSettings = async function (req, res) {
    try {
        let jenkins = await jenkinsService.deleteJenkinsSettings(req.headers["token"], req);
        res.status(200).send({ jenkins });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};
exports.deletejenkinsSetting = async function (req, res) {
    console.log("controller",req.headers)

    try {
        let jenkins = await jenkinsService.deleteJenkinsSetting(req.headers["token"], req);
        res.status(200).send({ jenkins });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};

