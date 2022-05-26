
const db = require("../models");

const Grafana = db.grafana;


exports.createGrafanaSettings = async function (userId, req) {
    try {
        console.log(req.body);
        let grafana = new Grafana(req.body);
        console.log('Inside create jenkins ');
        grafana.userId = userId;
        var grafanaRes = await grafana.save();
        console.log(grafanaRes);
        return grafanaRes;
    } catch (e) {
        throw Error('Could not create git resource' + e);
    }
}

exports.getGrafanaSettings = async function (userId) {
    try {
        var grafana = await Grafana.find({ userId: userId });
        console.log(grafana);
        return grafana;
    } catch (e) {
        throw Error('No resources found' + e);
    }
}

exports.deleteGrafanaSettings = async function (userId, req) {
    try {
        let deletedCount = await Grafana.deleteMany({ userId: userId });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}
exports.deleteGrafanaSetting = async function (userId, req) {
    try {
        let deletedCount = await Grafana.deleteMany({ userId: userId, _id: req.query.id });
        return deletedCount;
    } catch (e) {
        throw Error(e);
    }
}