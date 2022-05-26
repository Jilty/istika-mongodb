
var muleService = require("../services/muleService.js");
var AuthService = require("../services/authService.js");
exports.createMuleOrganization = async function (req, res) {
    try {
        console.log("Inside Muke")
        let mule = await muleService.createMuleOrganization(req.headers["token"], req);
        res.status(200).send({ mule });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.getMuleOrganization = async function (req, res) {
    try {
        let mule = await muleService.getMuleOrganization(req.headers["token"]);
        res.status(200).send(mule);
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.deleteMuleOrganization = async function (req, res) {
    try {
        let mule = await muleService.deleteMuleOrganization(req.headers["token"], req);
        res.status(200).send({ mule });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};

exports.createMuleSettings = async function (req, res) {
    try {
        console.log("Inside Muke")
        let mule = await muleService.createMuleSettings(req.headers["token"], req);
        res.status(200).send({ mule });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.getMuleSettings = async function (req, res) {
    try {
        let mule = await muleService.getMuleSettings(req.headers["token"], req);
        res.status(200).send(mule);
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};

exports.getMuleSetting = async function (req, res) {
    try {
        let mule = await muleService.getMuleSetting(req.headers["token"], req);
        res.status(200).send(mule);
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};

exports.getRTFSettings = async function (req, res) {
    try {
        let mule = await muleService.getRTFSettings(req.headers["token"], req);
        res.status(200).send(mule);
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.updateRTFSettings = async function (req, res) {
    try {
        let mule = await muleService.updateRTFSettings(req.headers["token"], req);
        res.status(200).send(mule);
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not update project" + e });
    }

};
exports.createRTFSettings = async function (req, res) {
    try {
        console.log("Inside Muke")
        let mule = await muleService.createRTFSettings(req.headers["token"], req);
        res.status(200).send({ mule });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.deleteRTFSettings = async function (req, res) {
    try {
        let mule = await muleService.deleteRTFSettings(req.headers["token"], req);
        res.status(200).send({ mule });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};

exports.deleteMuleSettings = async function (req, res) {
    try {
        let mule = await muleService.deleteMuleSettings(req.headers["token"], req);
        res.status(200).send({ mule });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};
exports.updateRtfResource = async function (req, res) {
    try {
        let awsResource = await muleService.updateRtfResources(AuthService.getToken(req), req);
        res.status(200).send({ resources: awsResource });
    } catch (e) {
        res.status(400).send({ message: 'Could not save resources' + e });
    }


}


