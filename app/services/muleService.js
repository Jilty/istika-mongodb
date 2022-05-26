
const db = require("../models");

const Mule = db.mule;
const MuleOrg = db.muleOrg;
const RTF = db.rtf;
exports.createMuleOrganization = async function (userId, req) {
    try {
        console.log(req.body);
        let mule = new MuleOrg(req.body);
        console.log('Inside create mule ');
        mule.userId = userId;
        var muleRes = await mule.save();
        console.log(muleRes);
        return muleRes;
    } catch (e) {
        throw Error('Could not create mule resource' + e);
    }
}

exports.getMuleOrganization = async function (userId) {
    try {
        var mule = await MuleOrg.find({ userId: userId });
        console.log(mule);
        return mule;
    } catch (e) {
        throw Error('No resources found' + e);
    }
}

exports.deleteMuleOrganization = async function (userId, req) {
    try {
        let deletedCount = await MuleOrg.deleteMany({ userId: userId });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}

exports.createMuleSettings = async function (userId, req) {
    try {
        console.log(req.body);
        let mule = new Mule(req.body);
        console.log('Inside create mule ');
        mule.userId = userId;
        var muleRes = await mule.save();
        console.log(muleRes);
        return muleRes;
    } catch (e) {
        throw Error('Could not create mule resource' + e);
    }
}

exports.getMuleSettings = async function (userId) {
    try {
        var mule = await Mule.find({ userId: userId });
        console.log(mule);
        return mule;
    } catch (e) {
        throw Error('No resources found' + e);
    }
}

exports.getMuleSetting = async function (userId,req) {
    try {
        var mule = await Mule.find({ userId: userId, _id: req.params.id });
        console.log(mule);
        return mule;
    } catch (e) {
        throw Error('No resources found' + e);
    }
}

exports.deleteMuleSettings = async function (userId, req) {
    try {
        let deletedCount = await Mule.deleteMany({ userId: userId });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}


exports.createRTFSettings = async function (userId, req) {
    try {
        console.log(req.body);
        let rtf = new RTF(req.body);
        console.log('Inside create mule ');
        rtf.userId = userId;
        var muleRes = await rtf.save();
        console.log(muleRes);
        return muleRes;
    } catch (e) {
        throw Error('Could not create mule resource' + e);
    }
}

exports.getRTFSettings = async function (userId) {
    try {
        var rtf = await RTF.find({ userId: userId });
        console.log(rtf);
        return rtf;
    } catch (e) {
        throw Error('No resources found' + e);
    }
}
exports.updateRTFSettings = async function (userId,req) {
    try {
        const query = { rtfId: req.body.rtfId };
        const update = { $set: { status: req.body.status}};
        const options = {};
        var rtf = await RTF.updateOne(query, update, options);
        console.log(rtf);
        return rtf;
    } catch (e) {
        throw Error('No resources found' + e);
    }
}
exports.deleteRTFSettings = async function (userId, req) {
    try {
        let deletedCount = await RTF.deleteMany({ userId: userId });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}

exports.updateRtfResources = async function (userId, req) {
    var objForUpdate = {};

    if (req.body.rtfUrl) objForUpdate.rtfUrl = req.body.rtfUrl;
    console.log(objForUpdate);
    // if (req.body.clusterContext) objForUpdate.clusterContext = req.body.clusterContext;

    //before edit- There is no need for creating a new variable
    //var setObj = { $set: objForUpdate }

    objForUpdate = {
    $set: objForUpdate
    }
    console.log("Inside rty1");
    try {

        const query = { rtfName: req.params.rtfName, userId: userId };
        // const update = { $set: { awsUrl: req.body.awsUrl} };
        const options = {upsert : true };
        console.log(query)
        var rtfResource = await RTF.updateOne(query, objForUpdate, options);
        console.log(rtfResource);
        return rtfResource;

    } catch (e) {
        console.log(e);
        throw Error('No resources found');
    }
}