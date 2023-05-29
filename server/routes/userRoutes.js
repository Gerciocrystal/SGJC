const express = require("express");
const { createUser, getUser } = require("../controller/userController");
const { protect, protectedRoutes } = require("../middleware/authMiddleware");
const userRoutes = express.Router();

userRoutes.route("/").post(protect, protectedRoutes, createUser);
userRoutes.route("/login").post(getUser);

module.exports = userRoutes;
