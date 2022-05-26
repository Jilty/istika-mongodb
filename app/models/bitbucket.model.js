const mongoose = require('mongoose');
const { series } = require('async');

const bitbucketSchema = mongoose.Schema({
    userId: String,
    bitbucketUsername: String,
    bitbucketPat: String,
    bitbucketWorkspace: String,
    bitbucketProject: String
}, { timestamps: true })

module.exports = mongoose.model('bitBucket', bitbucketSchema)