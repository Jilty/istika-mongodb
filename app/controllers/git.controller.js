
var GitService = require("../services/gitService.js");

exports.createGit = async function (req, res) {
    try {
        let gitRepo = await GitService.createGitRepo(req.headers["token"], req);
        res.status(200).send({ gitRepo });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.getGitRepo = async function (req, res) {
    try {
        let gitRepo = await GitService.getGitRepo(req.headers["token"], req);
        res.status(200).send({ gitRepo });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.deleteRepos = async function (req, res) {
    try {
        let gitRepo = await GitService.deleteGitRepos(req.headers["token"], req);
        res.status(200).send({ gitRepo });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};
exports.deleteRepo = async function (req, res) {
    try {
        let gitRepo = await GitService.deleteGitRepo(req.headers["token"], req);
        res.status(200).send({ gitRepo });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not delete project" + e });
    }

};

