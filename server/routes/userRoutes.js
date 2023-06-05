const express = require("express");
const {
  createUser,
  getUser,
  getUsers,
} = require("../controller/userController");
const { protect, protectedRoutes } = require("../middleware/authMiddleware");
const userRoutes = express.Router();

userRoutes
  .route("/")
  .get(protect, getUsers)
  .post(protect, protectedRoutes, createUser);
userRoutes.route("/login").post(getUser);

module.exports = userRoutes;
