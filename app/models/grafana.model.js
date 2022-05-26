const mongoose = require('mongoose');

const jenkinsSchema = mongoose.Schema({
    userId: String,
    grafanaUrl: String,
    grafanaToken: String,
}, { timestamps: true })

module.exports = mongoose.model('grafana', jenkinsSchema)