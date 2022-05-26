const mongoose = require('mongoose');
const azureDevops = mongoose.Schema({
    "userId": String,
    "organization": String,
    "azDevopsPat": String
}, { timestamps: true }
);

module.exports = mongoose.model('azureDevops', azureDevops) 