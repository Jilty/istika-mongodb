const { authJwt } = require("../middlewares");
const controller = require("../controllers/aws.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/db/v1/awsresource", [authJwt.verifyToken], controller.createAwsResource);

    app.delete("/api/db/v1/awsresource", [authJwt.verifyToken], controller.deleteAwsResources);

    app.delete("/api/db/v1/awsresource", [authJwt.verifyToken], controller.deleteAwsResource);

    app.get("/api/db/v1/awsresource", [authJwt.verifyToken], controller.awsResources);

    app.get("/api/db/v1/awsresource/:id", [authJwt.verifyToken], controller.awsResource);

    app.put("/api/db/v1/awsresource/:awscluster", [authJwt.verifyToken], controller.updateAwsResource);


   
};
