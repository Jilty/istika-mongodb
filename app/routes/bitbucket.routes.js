const { authJwt } = require("../middlewares");
const controller = require("../controllers/bitbucket.controller")

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/db/v1/bitbucket", [authJwt.verifyToken], controller.getBitBucketRepo);

    app.post("/api/db/v1/bitbucket", [authJwt.verifyToken], controller.createBitBucket);

    app.delete("/api/db/v1/bitbucket", [authJwt.verifyToken], controller.deleteBitBucketRepos);

    app.delete("/api/db/v1/bitbucket/:id", [authJwt.verifyToken], controller.deleteBitBucketRepo);

};
