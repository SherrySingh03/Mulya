const express = require("express");
const Register = require("../controllers/AuthController/Register");
const Login = require("../Controllers/AuthController/login");

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);

module.exports = router;
