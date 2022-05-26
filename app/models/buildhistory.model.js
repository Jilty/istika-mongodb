const mongoose = require('mongoose');
const buildHistory = mongoose.Schema({
    projectId: String,
    userId:String,
    status: String,
    steps: String   
}, { timestamps: true })

module.exports = mongoose.model('buildhistory', buildHistory)