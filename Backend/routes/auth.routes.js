const authController = require("../controller/auth.controller");
const express = require("express");
const authRoutes = express.Router();

authRoutes.post("/register", authController.handleRegister);
authRoutes.post("/login", authController.handleLogin);
authRoutes.post("/logout", authController.handleLogout);
module.exports = authRoutes;
