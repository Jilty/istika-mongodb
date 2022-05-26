
const db = require("../models");
const { user, project } = require("../models");

const BitBucket = db.bitBucket;


exports.createBitBucketRepo = async function (userId, req) {
    try {
        console.log("Bitbucket request");
        console.log(req.body)
        let bitbucket = new BitBucket(req.body);
        bitbucket.userId = userId;
        var bitHubRes = await bitbucket.save();
        console.log(bitHubRes);
        return bitHubRes;
    } catch (e) {
        throw Error('Could not create git resource' + e);
    }
}

exports.getBitBucketRepo = async function (userId) {
    try {
        var git = await BitBucket.find({ userId: userId });
        console.log(git);
        return git;
    } catch (e) {
        throw Error('No resources found' + e);
    }
}

exports.deleteBitBucketRepos = async function (userId, req) {
    try {
        let deletedCount = await BitBucket.deleteMany({ userId: userId });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}
exports.deleteBitBucketRepo = async function (userId, req) {
    try {
        let deletedCount = await BitBucket.deleteMany({ userId: userId, _id: req.query.id });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}