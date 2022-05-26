
const db = require("../models");
const { user, project } = require("../models");

const GitHub = db.git;


exports.createGitRepo = async function (userId, req) {
    try {
        let github = new GitHub(req.body);
        github.userId = userId;
        var gitHubRes = await github.save();
        console.log(gitHubRes);
        return gitHubRes;
    } catch (e) {
        throw Error('Could not create git resource' + e);
    }
}

exports.getGitRepo = async function (userId) {
    try {
        var git = await GitHub.find({ userId: userId });
        console.log(git);
        return git;
    } catch (e) {
        throw Error('No resources found' + e);
    }
}

exports.deleteGitRepos = async function (userId, req) {
    try {
        let deletedCount = await GitHub.deleteMany({ userId: userId });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}
exports.deleteGitRepo = async function (userId, req) {
    try {
        let deletedCount = await GitHub.deleteMany({ userId: userId, _id: req.query.id });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}