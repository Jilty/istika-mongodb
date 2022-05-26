var jwtDecode = require('jwt-decode');
// const Role = require("../models/role.model");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.getToken = (req) => {
    let token = req.headers["x-access-token"];
    var decoded = jwtDecode(token);
    return decoded.id;
};

exports.signUp = async (req) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        let userSaved = await user.save();
        if (req.body.roles) {
            let roles = await Role.find({
                name: { $in: req.body.roles }
            });
            userSaved.roles = roles.map(role => role._id);
        } else {
            let roles = await Role.findOne({ name: "user" });
            userSaved.roles = [role._id];
        }
        let savedUser = await userSaved.save();
        return savedUser;

    } catch (e) {
        throw Error(e);
    }
}
exports.signIn = async (req) => {
    try {
        let user = await User.findOne({
            username: req.body.username
        }).populate("roles", "-__v").exec();

        if (!user) {
            return ({ message: "User not found" });
        }
        var passwordIsValid = await bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return ({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        var token = await jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            await authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        return ({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });

    } catch (e) {
        throw Error(e);
    }
}