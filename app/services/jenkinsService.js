
const db = require("../models");

const Jenkins = db.jenkins;


exports.createJenkinsSettings = async function (userId, req) {
    try {
        let jenkins = new Jenkins(req.body);
        jenkins.userId = userId;
        var jenkinsRes = await jenkins.save();
        console.log(jenkinsRes);
        return jenkinsRes;
    } catch (e) {
        throw Error('Could not create git resource' + e);
    }
}

exports.getJenkinsSettings = async function (userId) {
    try {
        var jenkins = await Jenkins.find({ userId: userId });
        console.log(jenkins);
        return jenkins;
    } catch (e) {
        throw Error('No resources found' + e);
    }
}

exports.deleteJenkinsSettings = async function (userId, req) {
    console.log("servuce",userId,req)
    try {
        let deletedCount = await Jenkins.deleteMany({ userId: userId });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}
exports.deleteJenkinsSetting = async function (userId, req) {
    console.log("value",userId,req.query.id)
    try {
        let deletedCount = await Jenkins.deleteMany({ userId: userId, _id: req.query.id });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}