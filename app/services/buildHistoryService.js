
const { user } = require("../models");
const db = require("../models");
const test =require("../models/buildhistory.model")
const BuildHistory = test;
exports.createBuildHistory = async function (userId, req) {
    const myJSONArray = JSON.stringify(req.body.steps)
    let historyObj = new BuildHistory(req.body);
    historyObj.steps=myJSONArray
    historyObj.userId = userId;
    try {
        let historyCreated = await historyObj.save();
        return historyCreated;
    } catch (e) {
        throw Error('Could not add the status' + e);
    }
}

exports.updateBuildHistory = async function (userId, req) {
    BuildHistory.findOne({_id: req.body.buildId}, function(err, buildhistory) {
    if(!err) {
        if(!buildhistory) {
            buildhistory = new BuildHistory();
            buildhistory.Status= 'success';
        }
        var array = JSON.parse(buildhistory.steps)
        array[array.length] = req.body.step;
        buildhistory.steps = JSON.stringify(array);
        let historyObj = new BuildHistory(buildhistory);
        historyObj.save(function(err) {
            if(!err) {
                console.log("Successfully updated the status");
            }
            else {
                console.log("Error: could not update status " );
            }
        });
    }
});
}

exports.getBuildHistory = async function (userId,req) {
    console.log("service",req.body.projectId)
    try {
        var buildHistory = await BuildHistory.find({userId:userId, projectId: req.body.projectId});
        return buildHistory;
    } catch (e) {
        throw Error('No resources found');
    }
}
