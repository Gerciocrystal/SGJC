const User = require("../models/userModel");
const Alumini = require("../models/aluminsModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcryptjs");
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

    let user = await User.findOne({ username }).populate("departamento");
    const alumini = await Alumini.findOne({ cod_estudante: username }).populate(
      "departamento"
    );

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

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        type: user.type,
        departamento: user.departamento,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Password ou Username incorrecto");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Falha no processo de procura de utilizador");
  }
});

exports.changePassword = asyncHandler(async (req, res) => {
  try {
    const { username, password, newPassword } = req.body;

    let user = await User.findOne({ username }).populate("departamento");

    if (user && (await user.matchPassword(password))) {
      const salt = await bcrypt.genSalt(10);
      const newPass = await bcrypt.hash(newPassword, salt);

      user = await User.updateOne(
        { username },
        { password: newPass },
        { new: true }
      );

      res.send("password Changed");
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

exports.getUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
          { type: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.json(users);
});
