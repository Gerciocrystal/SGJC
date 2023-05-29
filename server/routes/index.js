const express = require("express");
const AluminiRoutes = require("./alumini");
const apresentacaoRoutes = require("./apresentacao");
const categoriaRoutes = require("./categoria");
const departamentoRoutes = require("./deparatamento");
const notificacoesRouter = require("./notificacoes");
const reclamacaoRoutes = require("./reclamacao");
const userRoutes = require("./userRoutes");
const Routes = express.Router();

Routes.use("/user", userRoutes);
Routes.use("/departamento", departamentoRoutes);
Routes.use("/alumini", AluminiRoutes);
Routes.use("/apresentacao", apresentacaoRoutes);
Routes.use("/categoria", categoriaRoutes);
Routes.use("/notificacao", notificacoesRouter);
Routes.use("/reclamacao", reclamacaoRoutes);
module.exports = Routes;
