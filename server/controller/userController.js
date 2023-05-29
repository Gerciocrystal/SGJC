const User = require("../models/userModel");
const Alumini = require("../models/aluminsModel");
const generateToken = require("../config/generateToken");
const asyncHandler = require("express-async-handler");
exports.createUser = asyncHandler(async (req, res) => {
  try {
    const { name, username, password, email, pic, departamento } = req.body;
    const type = "ADMIN";
    if (!name || !username || !password || !email || !departamento) {
      res.status(400);
      throw new Error("Prencha todos os campos");
    }

    const userExist = await User.findOne({ username });

    if (userExist) {
      res.status(400);
      throw new Error("Utilizador ja existe na base de dados");
    }

    let user = await User.create({
      name,
      username,
      password,
      email,
      type,
      pic,
      departamento,
    });
    user = await user.populate("departamento");
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        pic: user.pic,
        departamento: user.departamento,
      });
    } else {
      res.status(400);
      throw new Error("Falha no processo de criacao de usuario");
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no processo de Criacao de Novo Utilizador");
  }
});
/**
 * @param username
 * @param password
 *
 * caso exista um alumini mas nao exista um user ele cria um novo user do role Estudante
 */
exports.getUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });
    const alumini = await Alumini.findOne({ cod_estudante: username });

    if (!user && alumini) {
      user = await User.create({
        name: alumini.nome,
        username: alumini.cod_estudante,
        password: alumini.cod_estudante,
        email: alumini.email,
        departamento: alumini.departamento,
        type: "Estudante",
      });
      if (user) {
        await Alumini.findOneAndUpdate(
          { cod_estudante: username },
          { status: true }
        );
      }
    }
    console.log(user);
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        type: user.type,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Password ou Username incorrecto");
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no processo de procura de utilizador");
  }
});
