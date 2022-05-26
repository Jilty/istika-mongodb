
const db = require("../models");

var ProjectService = require("../services/projectServices.js");
var AuthService = require("../services/authService.js");

const Project = db.project;
updateGitProject = async function (projectid, giturl) {
    Project.updateMany({ _id: projectid }, { $set: { gitUrl: giturl } }, (err, stat) => {
        if (err) {
            res.status(500).send({ message: "something occured" });
        }
    })
}
updateProject = async function (req, res) {
    try {
        let updatedProject = await ProjectService.updateProject(req.headers["token"], req);
        res.status(200).send(updatedProject);
    } catch (e) {
        res.status(404).send({ message: "Could not update project" + e });
    }
}
exports.createproject = async function (req, res) {
    try {
        let createProject = await ProjectService.createProject(req.headers["token"], req);
        res.status(200).send({ createProject });
    } catch (e) {
        console.log("Inside catch" + e);
        res.status(404).send({ message: "Could not create project" + e });
    }

};
exports.deleteproject = async function (req, res) {
    try {
        let deleteProject = await ProjectService.deleteProject(req.headers["token"], req);
        res.status(200).send({ deleteProject });
    } catch (e) {
        res.status(404).send({ message: "Could not create project" });
    }

};
exports.deleteprojects = async function (req, res) {

    try {
        let deleteProject = await ProjectService.deleteProjects(req.headers["token"]);
        res.status(200).send({ deleteProject });
    } catch (e) {
        res.status(404).send({ message: "Could not delete project" });
    }
};
exports.getprojects = async function (req, res) {
    try {
        let projects = await ProjectService.getProjects(req.headers["token"]);
        res.status(200).send(projects);
    } catch (e) {
        res.status(404).send({ message: "Could not retrieve project" });
    }
}
exports.getproject = async function (req, res) {
    try {
        let projects = await ProjectService.getProject(req.headers["token"], req.query.id);
        res.status(200).send({ projects });
    } catch (e) {
        res.status(404).send({ message: "Could not retrieve project" });
    }
}
