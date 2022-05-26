const mongoose = require('mongoose');
const awsResources = mongoose.Schema({
    "userId": String,
    "awsaccesskey": String,
    "awsaccesskeyid": String,
    "awscluster": String,
    "location": String,
    "awsUrl": String,
    "clusterContext": String
}, { timestamps: true }
);

module.exports = mongoose.model('awsResources', awsResources) 