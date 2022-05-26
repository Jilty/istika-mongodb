const mongoose = require('mongoose');

const muleSchema = mongoose.Schema({
    userId: String,
    organization: String

}, { timestamps: true })

module.exports = mongoose.model('muleOrg', muleSchema)