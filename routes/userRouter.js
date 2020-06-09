const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");




router.get("/", userController.index);

router.route("/register")
    .get(userController.getRegisterUser)
    .post(userController.postRegisterUser);

router.route("/login")
    .get(userController.getLoginUser)
    .post(userController.postLoginUser);

router.get("/islogged", userController.isLogged);
router.get("/logout", userController.logoutUser)


module.exports = router;