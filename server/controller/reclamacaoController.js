const Reclamacao = require("../models/reclamacaoModel");
const asyncHandler = require("express-async-handler");
exports.createReclamacao = asyncHandler(async (req, res) => {
  try {
    const { nome, cod_estudante, email, contacto, problema, descricao } =
      req.body;
    if (
      !nome ||
      !cod_estudante ||
      !email ||
      !contacto ||
      !problema ||
      !descricao
    ) {
      res.status(400);
      throw new Error("Preencha todos os campos");
    }
    const reclamacao = await Reclamacao.create({
      nome,
      cod_estudante,
      email,
      contacto,
      problema,
      descricao,
    });

    res.json(reclamacao);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no processo de criacao de nova Reclamacao");
  }
});
exports.updadeReclamacao = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const reclamacao = await Reclamacao.findByIdAndUpdate(
      { _id: id },
      { status: "ATENDIDO" },
      { new: true }
    );

    if (reclamacao) {
      res.json(reclamacao);
      return;
    } else res.status(400).send("falha no processo de updade");
  } catch (error) {
    res.status(400);
    throw new Error("falha no processo de updade de reclamacao");
  }
});
exports.deleteReclamacao = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const reclamacao = await Reclamacao.findByIdAndDelete(
      { _id: id },
      { new: true }
    );

    if (reclamacao) {
      res.json(reclamacao);
      return;
    } else res.status(400).send("falha no processo de delete");
  } catch (error) {
    res.status(400);
    throw new Error("falha no processo de updade de reclamacao");
  }
});
exports.getReclamacoes = asyncHandler(async (req, res) => {
  try {
    const reclamacao = await Reclamacao.find();
    if (reclamacao) {
      res.json(reclamacao);
      return;
    }
    res.send("nao ha registros");
  } catch (error) {
    res.status(400);
    throw new Error("falha no precesso de criacao de nova reclamacao");
  }
});
