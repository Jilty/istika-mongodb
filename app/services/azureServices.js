
const { exec } = require("child_process");
const db = require("../models");
const { authJwt } = require("../middlewares");
const config = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");// to be removed

const fs = require('fs');
const yaml = require('js-yaml');
const { response } = require("express");

const moment = require('moment');
const { setTimeout } = require("timers");
const { user } = require("../models");
const organization = "https://dev.azure.com/njclabsmicrolabs";


const AzureResource = db.azResources;
const AzureDevops= db.azDevops;
const BuildPipeline = db.buildPipeline;
const BuildProject = db.buildProject;


exports.getAzureResources = async function (userId) {
    try {
        var resource = await AzureResource.find({ userId: userId })
        return resource;
    } catch (e) {
        // Log Errors
        throw Error('No resource found')
    }
}
exports.updateAzureResources = async function (userId,req) {

    var objForUpdate = {};

    if (req.body.azDevopsPat) objForUpdate.azDevopsPat = req.body.azDevopsPat;
    console.log(objForUpdate);
    // if (req.body.clusterContext) objForUpdate.clusterContext = req.body.clusterContext;

    //before edit- There is no need for creating a new variable
    //var setObj = { $set: objForUpdate }

    objForUpdate = {
    $set: objForUpdate
    }
    console.log("Inside rty1");
    try {

        const query = { _id: req.params.id, userId: userId };
        // const update = { $set: { awsUrl: req.body.awsUrl} };
        const options = {upsert : true };
        console.log(query)
        var rtfResource = await AzureResource.updateOne(query, objForUpdate, options);
        console.log(rtfResource);
        return rtfResource;

    } catch (e) {
        console.log(e);
        throw Error('No resources found');
    }
   
}
exports.getAzureResource = async function (userId,req) {
    try {
        var resource = await AzureResource.find({ userId: userId, resource_group_name: req.params.resourceGroup })
        return resource;
    } catch (e) {
        // Log Errors
        throw Error('No resource found')
    }
}
exports.getAzureDevops = async function (userId,req) {
    try {
        var resource = await AzureDevops.find({ userId: userId })
        return resource;
    } catch (e) {
        // Log Errors
        throw Error('No resource found')
    }
}
exports.deleteAzureResources = async function (userId, resourceId) {

    try {
        var resource = await AzureResource.deleteMany({ userId: userId, _id: resourceId });
        return resource;
    } catch (e) {
        // Log Errors
        throw Error('No resource found')
    }
}
exports.checkAksStatus = async function (userId, aks) {
    try {
        var aksStatus = await AzureResource.find({ userId: userId, aks_cluster_name: aks, aks_created: true });
        return aksStatus;
    } catch (e) {
        throw Error('No resources found');
    }
}
exports.createResources = async function (userId, resourceObj) {
    console.log("Inside rty1");
    try {
        console.log("Inside rty");
        const resources = new AzureResource(resourceObj);
        resources.userId = userId;
        let resSaved = await resources.save();
        console.log(resSaved);
        return resSaved;

    } catch (e) {
        console.log(e);
        throw Error('No resources found');
    }
}
exports.createDevops = async function (userId, resourceObj) {
    console.log("Inside rty1");
    try {
        console.log("Inside rty");
        const resources = new AzureDevops(resourceObj);
        resources.userId = userId;
        let resSaved = await resources.save();
        console.log(resSaved);
        return resSaved;

    } catch (e) {
        console.log(e);
        throw Error('No resources found');
    }
}
exports.getAksStatus = async function (userId, reqBody) {
    try {
        let aksStatus = AzureResource.find({ userId: userId, aks_cluster_name: reqBody.body.aks, _id: reqBody.body.id });
        return aksStatus
    } catch (e) {
        throw Error('No status found' + e)
    }
}


exports.saveProjectBuild = async function (userId, req) {
    try {
        const buildPipeline = new BuildPipeline(req.body);
        buildPipeline.userId = userId;
        let savedBuildPipline = await buildPipeline.save();
        return savedBuildPipline;
    } catch (e) {
        throw Error(e);
    }
}
exports.getProjectBuild = async function (userId, req) {
    try {
        BuildProject.find({ userId: userId, projectId: req.query.id }, (err, status) => {
            if (err) {
                return ({ message: 'NOT_FOUBD' });
            }
            return status;
        })
    } catch (e) {
        throw Error('No build found');
    }
}


exports.deleteProjectBuild = async function (userId, req) {
    try {
        BuildPipeline.deleteOne({ userId: userId, projectName: req.body.projectName }, (err, response) => {
            if (err) {
                return ({ message: 'No builds found' });
            }
            return response;
        })
    } catch (e) {
        throw Error('No build found');
    }
}