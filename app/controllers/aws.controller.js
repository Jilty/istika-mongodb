
const { exec } = require("child_process");
const db = require("../models");
const { authJwt } = require("../middlewares");
const config = require("../config/auth.config.js");
const jwt = require("jsonwebtoken");// to be removed

const fs = require('fs');
const yaml = require('js-yaml');
const { response } = require("express");

const moment = require('moment');
const { setTimeout } = require("timers");
var AwsService = require("../services/awsServices.js");
var AuthService = require("../services/authService.js");

exports.awsResources = async function (req, res) {
    try {
        let awsResource = await AwsService.getAwsResources(AuthService.getToken(req), req.body);
        res.status(200).send(awsResource);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.awsResource = async function (req, res) {
    try {
        let awsResource = await AwsService.getAwsResource(AuthService.getToken(req), req.body);
        res.status(200).send(awsResource);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteAwsResource = async function (req, res) {
    console.log(req.body.id)
    try {
        let awsResource = await AwsService.deleteAwsResources(AuthService.getToken(req), req.body.id);
        res.status(200).send(awsResource);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

}

exports.deleteAwsResources = async function (req, res) {
    console.log(req.body.id)
    try {
        let awsResource = await AwsService.deleteAwsResources(AuthService.getToken(req), req.body.id);
        res.status(200).send(awsResource);
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

}

exports.createAwsResource = async function (req, res) {
    try {
        let awsResource = await AwsService.createAwsResources(AuthService.getToken(req), req.body);
        res.status(200).send({ resources: awsResource });
    } catch (e) {
        res.status(400).send({ message: 'Could not save resources' + e });
    }


}

exports.updateAwsResource = async function (req, res) {
    try {
        let awsResource = await AwsService.updateAwsResources(AuthService.getToken(req), req);
        res.status(200).send({ resources: awsResource });
    } catch (e) {
        res.status(400).send({ message: 'Could not save resources' + e });
    }


}