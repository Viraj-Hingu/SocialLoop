const authController = require("../controller/auth.controller");
const express = require("express");
const authRoutes = express.Router();

authRoutes.post("/register", authController.handleRegister);
authRoutes.post("/login", authController.handleLogin);
module.exports = authRoutes;
