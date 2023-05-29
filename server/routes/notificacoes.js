const express = require("express");
const {
  createNotificacao,
  getNotificacoes,
  updadeStatus,
  deleteNotificacao,
} = require("../controller/notificacoesController");
const { protect } = require("../middleware/authMiddleware");
const notificacoesRouter = express.Router();

notificacoesRouter
  .use(protect)
  .route("/")
  .post(createNotificacao)
  .get(getNotificacoes);

notificacoesRouter
  .use(protect)
  .route("/:id")
  .put(updadeStatus)
  .delete(deleteNotificacao);

module.exports = notificacoesRouter;
