const Categoria = require("../models/categoriaModel");
const aysncHandler = require("express-async-handler");
exports.createCategoria = aysncHandler(async (req, res) => {
  try {
    const { nome, departamento } = req.body;

    if (!nome || !departamento) {
      res.status(400);
      throw new Error("Preencha todos os campos");
    }
    const existCategoria = await Categoria.findOne({ nome });

    if (existCategoria) {
      res.status(400);
      throw new Error("Categoria ja existe");
    }

    let categoria = await Categoria.create({ nome, departamento });
    categoria = await categoria.populate("departamento");

    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no processo de criacao de nova categoria");
  }
});

exports.getCategorias = aysncHandler(async (req, res) => {
  try {
    const categoria = await Categoria.find().populate("departamento");

    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no processo de criacao de categoria");
  }
});
exports.getCategoria = aysncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const categoria = await Categoria.findById(id).populate("departamento");

    res.json(categoria);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no processo de Procura de categoria");
  }
});
