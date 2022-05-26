const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = async function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        console.log("resfff",res)

        next();
    });

    app.post(
        "/api/v1/auth/register",
        [
            await verifySignUp.checkDuplicateUsernameOrEmail,
            await verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/v1/auth/signin", controller.signin);
};
