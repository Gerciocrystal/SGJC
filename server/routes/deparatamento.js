const express = require("express");
const {
  createDepartamento,
  getDepartamentos,
} = require("../controller/departamentoController");
const { protect, protectedRoutes } = require("../middleware/authMiddleware");
const departamentoRoutes = express.Router();

departamentoRoutes
  .use(protect)
  .route("/")
  .post(protectedRoutes, createDepartamento)
  .get(getDepartamentos);

module.exports = departamentoRoutes;
