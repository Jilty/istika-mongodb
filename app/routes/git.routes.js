const { authJwt } = require("../middlewares");
const controller = require("../controllers/git.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.get("/api/db/v1/repo", [authJwt.verifyToken], controller.getGitRepo);

    app.post("/api/db/v1/repo", [authJwt.verifyToken], controller.createGit);

    app.delete("/api/db/v1/repos", [authJwt.verifyToken], controller.deleteRepos);

    app.delete("/api/db/v1/repo", [authJwt.verifyToken], controller.deleteRepo);

};
