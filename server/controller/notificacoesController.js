const Notificacao = require("../models/notificacaoModel");
const asyncHandler = require("express-async-handler");
exports.createNotificacao = asyncHandler(async (req, res) => {
  try {
    const { tipo, user, descricao } = req.body;
    if ((!descricao, !tipo, !user)) {
      res.statu(400);
      throw new Error("Preencha todos os campos");
    }
    let notificacao = await Notificacao.create({
      tipo,
      descricao,
      user,
    });
    notificacao = await notificacao.populate("user", "username email");
    res.json(notificacao);
  } catch (error) {
    res.status(400);
    throw new Error("Falha no precesso de Criacao e Notificacao");
  }
});
exports.getNotificacoes = asyncHandler(async (req, res) => {
  try {
    console.log(req.user);
    const notificacoes = await Notificacao.find({ user: req.user._id });
    if (notificacoes) {
      res.json(notificacoes);
      return;
    }
    res.json("sem notificacoes");
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no precesso de get e Notificacao");
  }
});
exports.updadeStatus = asyncHandler(async (req, res) => {
  try {
    const notificacao_id = req.params.id;
    const notificacao = await Notificacao.findByIdAndUpdate(
      notificacao_id,
      {
        visualizada: true,
      },
      {
        new: true,
      }
    );

    if (notificacao) {
      res.json(notificacao);
      return;
    } else {
      res.status(400);
      throw new Error("Falha no processo de Updade da notificacao");
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no processo de Updade da notificacao");
  }
});
exports.deleteNotificacao = asyncHandler(async (req, res) => {
  try {
    const notificacao_id = req.params.id;
    const notificacao = await Notificacao.findByIdAndDelete(notificacao_id, {
      new: true,
    });

    if (notificacao) {
      res.json(notificacao);
      return;
    } else {
      res.status(400);
      throw new Error("Falha no processo de delete da notificacao");
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no processo de delete da notificacao");
  }
});
