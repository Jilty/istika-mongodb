const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.azResources = require("./azresources.model");
db.project = require("./project.model");
db.buildPipeline = require("./buildpipeline.model");
db.azureStatus = require("./status.model");
db.git = require("./git.model");
db.buildProject = require("./buildproject.model");
db.jenkins = require("./jenkins.model");
db.grafana = require("./grafana.model");
db.mule = require("./mule.model");
db.ROLES = ["user", "admin", "moderator"];
db.muleOrg = require("./muleOrg.model");
db.rtf = require("./rtf.model");
db.azDevops= require("./azdevops.model");
db.bitBucket= require("./bitbucket.model");
db.awsResources= require("./awsresources.model");

module.exports = db;
