const mongoose = require('mongoose');

const muleSchema = mongoose.Schema({
    userId: String,
    anypointUsername: String,
    anypointPassword: String,
    qaUsername: String,
    qaPassword: String,
    prodUsername: String,
    prodPassword: String,
    muleClientId: String,
    muleClientSecret: String,
    muleOrg: String,
    muleOrgId: String,
    rtfResouces: Array

}, { timestamps: true })

module.exports = mongoose.model('mule', muleSchema)