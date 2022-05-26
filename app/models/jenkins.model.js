const mongoose = require('mongoose');

const jenkinsSchema = mongoose.Schema({
    userId: String,
    jenkinsUsername: String,
    jenkinsServer: String,
    jenkinsToken: String
}, { timestamps: true })

module.exports = mongoose.model('jenkins', jenkinsSchema)