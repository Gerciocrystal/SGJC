const Alumini = require("../models/aluminsModel");
const asyncHandler = require("express-async-handler");
exports.createAlumini = asyncHandler(async (req, res) => {
  try {
    const { cod_estudante, nome, ano_entrada, email, departamento } = req.body;

    if (!cod_estudante || !nome || !ano_entrada || !email || !departamento) {
      res.status(400);
      throw new Error("Prencha todos os campos");
    }
    const aluminiExists = await Alumini.findOne({ cod_estudante });

    if (aluminiExists) {
      res.status(400);
      throw new Error("Estudante Ja esta Registrado no sistema");
    }
    let alumini = await Alumini.create({
      nome,
      cod_estudante,
      ano_entrada,
      email,
      departamento,
    });
    alumini = await alumini.populate("departamento");
    res.json(alumini);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no processo de criacao de Estudante");
  }
});
exports.getAlumini = asyncHandler(async (req, res) => {
  try {
    const aluminis = await Alumini.find().populate("departamento");

    res.json(aluminis);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no processo de criacao de Estudante");
  }
});
