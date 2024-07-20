const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const AuthController = require("../controllers/authController");

router.get("/userinfo", verifyToken, AuthController.findUserByToken);
router.post("/login", AuthController.Login);
router.post("/forgotpass", AuthController.forGotPassword);
router.post("/authforgotpass", AuthController.authForGotPassword);
module.exports = router;
