const express = require("express");
const {
  createApresentacao,
  getApresentacaoes,
  getApresentacao,
  deleteApresentacao,
  getMinhasApresentacoes,
  updadeApresentacao,
  getAmoutOf,
} = require("../controller/apresentacaoController");
const { protect, protectedRoutes } = require("../middleware/authMiddleware");
const apresentacaoRoutes = express.Router();

apresentacaoRoutes
  .use(protect)
  .route("/")
  .get(protectedRoutes, getApresentacaoes)
  .post(createApresentacao)
  .put(updadeApresentacao);

apresentacaoRoutes
  .use(protect)
  .route("/especifica")
  .get(protectedRoutes, getAmoutOf);

apresentacaoRoutes.route("/:id").delete(deleteApresentacao);
apresentacaoRoutes.route("/pessoal").get(getApresentacao);
apresentacaoRoutes.route("/minhas").get(getMinhasApresentacoes);
module.exports = apresentacaoRoutes;
