
const db = require("../models");
const { user, project } = require("../models");
const Project = db.project;

exports.createProject = async function (userId, req) {
    console.log(req.body)
    let projectObj = new Project(req.body);
    projectObj.userId = userId;
    try {
        let projectCreated = await projectObj.save();
        return projectCreated;
    } catch (e) {
        throw Error('Could not create project' + e);
    }

}
exports.deleteProject = async function (userId, req) {

    try {
        Project.deleteMany({ userId: userId, _id: req.body.id }, (err, response) => {
            return response;
        })
    } catch (e) {
        // Log Errors
        throw Error('No resource found')
    }
}
exports.deleteProjects = async function (userId) {

    try {
        Project.deleteMany({ userId: userId }, (err, response) => {
            return response;
        })
    } catch (e) {
        // Log Errors
        throw Error('No projects found')
    }
}
exports.getProjects = async function (userId, aks) {
    try {
        var projects = await Project.find({ userId: userId });
        return projects;
    } catch (e) {
        throw Error('No resources found');
    }
}
exports.getProject = async function (userId, id) {
    try {
        var project = await Project.find({ userId: userId, _id: id });
        return project;
    } catch (e) {
        throw Error('No resources found');
    }
}
exports.updateProject = async function (userId, req) {
    try {
        var project = await Project.updateMany({ projectName: req.body.projectName, userId: userId }, { $set: { buildId: req.body.buildId, buildComplete: true, resourceGroupName: req.body.resourceGroup } });
        return project;
    } catch (e) {
        throw Error("No resources found");
    }
}