const { authJwt } = require("../middlewares");
const controller = require("../controllers/grafana.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/v1/db/grafana", [authJwt.verifyToken], controller.getGrafanaSettings);

    app.post("/api/v1/db/grafana", [authJwt.verifyToken], controller.createGrafanaSettings);

    app.delete("/api/v1/db/grafana", [authJwt.verifyToken], controller.deleteGrafanaSettings);

    app.delete("/api/v1/db/grafana", [authJwt.verifyToken], controller.deleteGrafanaSetting);

};
