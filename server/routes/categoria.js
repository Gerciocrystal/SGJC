const express = require("express");
const {
  createCategoria,
  getCategorias,
  getCategoria,
} = require("../controller/categoriaController");
const { protect, protectedRoutes } = require("../middleware/authMiddleware");
const categoriaRoutes = express.Router();

categoriaRoutes
  .use(protect)
  .route("/")
  .post(protectedRoutes, createCategoria)
  .get(getCategorias);

categoriaRoutes.route("/:id").get(getCategoria);
module.exports = categoriaRoutes;
