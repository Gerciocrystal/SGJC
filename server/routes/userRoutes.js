const express = require("express");
const {
  createUser,
  getUser,
  getUsers,
  changePassword,
} = require("../controller/userController");
const { protect, protectedRoutes } = require("../middleware/authMiddleware");
const userRoutes = express.Router();

userRoutes
  .route("/")
  .get(protect, getUsers)
  .post(protect, protectedRoutes, createUser);
userRoutes.route("/login").post(getUser);
userRoutes.route("/chengePass").post(protect, changePassword);
module.exports = userRoutes;
