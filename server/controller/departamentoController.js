const Departamento = require("../models/departamento");
const asyncHandler = require("express-async-handler");
exports.createDepartamento = asyncHandler(async (req, res) => {
  try {
    const { nome, sigla } = req.body;

    if (!nome || !sigla) {
      res.status(400);
      throw new Error("Preencha todos os campos");
    }
    const departamentoExists = await Departamento.findOne({ sigla });
    if (departamentoExists) {
      res.status(400);
      throw new Error("Departamento ja existe");
    }

    const departamento = await Departamento.create({ nome, sigla });
    res.json(departamento);
  } catch (error) {
    console.log(error);
    throw new Error("Falha no precesso de criacao de departamento");
  }
});

exports.getDepartamentos = asyncHandler(async (req, res) => {
  try {
    const departamentos = await Departamento.find();
    res.json(departamentos);
  } catch (error) {
    console.log(error);
    throw new Error("Falha no precesso de Busca de departamentos");
  }
});
