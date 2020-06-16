const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");




router.get("/", userController.index);

router.route("/register")
    .all(function (req, res, next) {
        req.user ? res.redirect("/") : next();
    })
    .get(userController.getRegisterUser)
    .post(userController.postRegisterUser);

router.route("/login")
    .all(function (req, res, next) {
        req.user ? res.redirect("/") : next();
    })
    .get(userController.getLoginUser)
    .post(userController.postLoginUser);

router.get("/islogged", userController.isLogged);
router.get("/logout", userController.logoutUser)


module.exports = router;