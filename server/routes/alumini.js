const express = require("express");
const {
  createAlumini,
  getAlumini,
} = require("../controller/aluminsController");
const { protect, protectedRoutes } = require("../middleware/authMiddleware");
const AluminiRoutes = express.Router();

AluminiRoutes.use(protect)
  .route("/")
  .get(getAlumini)
  .post(protectedRoutes, createAlumini);

module.exports = AluminiRoutes;
