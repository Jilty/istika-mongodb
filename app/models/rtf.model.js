const mongoose = require('mongoose');

const rtfSchema = mongoose.Schema({
    userId: String,
    muleSettingsId: String,
    rtfId:String,
    rtfName: String,
    rtfEnv: String,
    rtfVendor: String,
    rtfRegion: String,
    rtfOrg: String,
    rtfAuthKey: String,
    rtfLicenseKey: String,
    deployTargetId: String,
    organizationID: String,
    targetCluster: String,
    rtfUrl: String,
    status: String

}, { timestamps: true })

module.exports = mongoose.model('rtf', rtfSchema)