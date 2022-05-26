
const db = require("../models");
const AwsResource = db.awsResources;

exports.getAwsResources = async function (userId) {
    try {
        var resource = await AwsResource.find({ userId: userId })
        return resource;
    } catch (e) {
        // Log Errors
        throw Error('No resource found')
    }
}
exports.getAwsResource = async function (userId,req) {
    try {
        var resource = await AwsResource.find({ userId: userId, resource_group_name: req.params.resourceGroup })
        return resource;
    } catch (e) {
        throw Error('No resource found')
    }
}

exports.deleteAwsResources = async function (userId, resourceId) {

    try {
        var resource = await AwsResource.deleteMany({ userId: userId, _id: resourceId });
        return resource;
    } catch (e) {
        // Log Errors
        throw Error('No resource found')
    }
}

exports.deleteAwsResource = async function (userId, resourceId) {

    try {
        var resource = await AwsResource.deleteMany({ userId: userId, _id: resourceId });
        return resource;
    } catch (e) {
        // Log Errors
        throw Error('No resource found')
    }
}

exports.createAwsResources = async function (userId, resourceObj) {
    console.log("Inside rty1");
    try {
        console.log("Inside rty");
        const resources = new AwsResource(resourceObj);
        resources.userId = userId;
        let resSaved = await resources.save();
        console.log(resSaved);
        return resSaved;

    } catch (e) {
        console.log(e);
        throw Error('No resources found');
    }
}

exports.updateAwsResources = async function (userId, req) {
    var objForUpdate = {};

    if (req.body.awsUrl) objForUpdate.awsUrl = req.body.awsUrl;
    if (req.body.clusterContext) objForUpdate.clusterContext = req.body.clusterContext;

    //before edit- There is no need for creating a new variable
    //var setObj = { $set: objForUpdate }

    objForUpdate = {
    $set: objForUpdate
    }
    console.log("Inside rty1");
    try {

        const query = { awscluster: req.params.awscluster, userId: userId };
        // const update = { $set: { awsUrl: req.body.awsUrl} };
        const options = {upsert : true };
        var awsResource = await AwsResource.updateOne(query, objForUpdate, options);
        console.log(awsResource);
        return awsResource;

    } catch (e) {
        console.log(e);
        throw Error('No resources found');
    }
}