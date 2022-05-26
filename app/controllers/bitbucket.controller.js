
var BitBucketService = require("../services/bitBucketService.js");

exports.createBitBucket = async function (req, res) {
    try {
        let gitRepo = await BitBucketService.createBitBucketRepo(req.headers["token"], req);
        res.status(200).send({ gitRepo });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.getBitBucketRepo = async function (req, res) {
    try {
        let gitRepo = await BitBucketService.getBitBucketRepo(req.headers["token"], req);
        res.status(200).send({ gitRepo });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.deleteBitBucketRepos = async function (req, res) {
    try {
        let gitRepo = await BitBucketService.deleteBitBucketRepos(req.headers["token"], req);
        res.status(200).send({ gitRepo });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};
exports.deleteBitBucketRepo = async function (req, res) {
    try {
        let gitRepo = await BitBucketService.deleteBitBucketRepo(req.headers["token"], req);
        res.status(200).send({ gitRepo });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};

