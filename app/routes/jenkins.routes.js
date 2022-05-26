const { authJwt } = require("../middlewares");
const controller = require("../controllers/jenkins.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/v1/db/jenkins", [authJwt.verifyToken], controller.getjenkinsSettings);

    app.post("/api/v1/db/jenkins", [authJwt.verifyToken], controller.createJenkinsSettings);

    app.delete("/api/v1/db/jenkins", [authJwt.verifyToken], controller.deletejenkinsSettings);

    app.delete("/api/v1/db/jenkin", [authJwt.verifyToken], controller.deletejenkinsSetting);

};
