const { authJwt } = require("../middlewares");
const controller = require("../controllers/buildhistory.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/db/v1/buildhistory", [authJwt.verifyToken], controller.createbuildhistory);
    app.patch("/api/db/v1/buildhistory", [authJwt.verifyToken], controller.updatebuildhistory);
    app.get("/api/db/v1/buildhistory", [authJwt.verifyToken], controller.getbuildhistory);

}