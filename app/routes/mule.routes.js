const { authJwt } = require("../middlewares");
const controller = require("../controllers/mule.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/v1/db/mule/org", [authJwt.verifyToken], controller.getMuleOrganization);

    app.post("/api/v1/db/mule/org", [authJwt.verifyToken], controller.createMuleOrganization);

    app.delete("/api/v1/db/mule/org", [authJwt.verifyToken], controller.deleteMuleOrganization);

    app.get("/api/v1/db/mule", [authJwt.verifyToken], controller.getMuleSettings);

    // app.get("/api/v1/db/mule/:id", [authJwt.verifyToken], controller.getMuleSetting);

    app.post("/api/v1/db/mule", [authJwt.verifyToken], controller.createMuleSettings);

    app.delete("/api/v1/db/mule", [authJwt.verifyToken], controller.deleteMuleSettings);

    app.post("/api/v1/db/mule/rtf", [authJwt.verifyToken], controller.createRTFSettings);

    app.get("/api/v1/db/mule/rtf", [authJwt.verifyToken], controller.getRTFSettings);

    app.patch("/api/v1/db/mule/rtf", [authJwt.verifyToken], controller.updateRTFSettings);
    

    app.delete("/api/v1/db/mule/rtf", [authJwt.verifyToken], controller.deleteRTFSettings);

    app.put("/api/db/v1/mule/rtf/:rtfName", [authJwt.verifyToken], controller.updateRtfResource);

    // app.delete("/api/v1/db/jenkin", [authJwt.verifyToken], controller.deletejenkinsSetting);

};
