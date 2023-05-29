const express = require("express");
const {
  createReclamacao,
  getReclamacoes,
  updadeReclamacao,
  deleteReclamacao,
} = require("../controller/reclamacaoController");
const reclamacaoRoutes = express.Router();
const { protect, protectedRoutes } = require("../middleware/authMiddleware");

reclamacaoRoutes
  .route("/")
  .post(createReclamacao)
  .get(protect, protectedRoutes, getReclamacoes);

reclamacaoRoutes
  .use(protect)
  .use(protectedRoutes)
  .route("/:id")
  .put(updadeReclamacao)
  .delete(deleteReclamacao);
module.exports = reclamacaoRoutes;
