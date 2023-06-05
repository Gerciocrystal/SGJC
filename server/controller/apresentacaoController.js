const Apresentacao = require("../models/apresentacao");
const asyncHandler = require("express-async-handler");
// const upload =require("express-fileupload");

exports.createApresentacao = asyncHandler(async (req, res) => {
  try {
    const { tema, supervisor, arquivo_path, categoria } = req.body;
    var particapantes;
    if (req.body.participantes) {
      particapantes = JSON.parse(req.body.participantes);
    } else particapantes = [];

    if (!tema || !supervisor || !arquivo_path || !categoria) {
      res.status(200);
      throw new Error("Preencha todos os campos");
    }
    let apresentacao = await Apresentacao.create({
      author: req.user._id,
      tema,
      participantes: particapantes,
      supervisor,
      arquivo_path,
      categoria,
    });
    if (!apresentacao) {
      res.status(400);
      throw new Error("Falha");
    }
    apresentacao = await apresentacao.populate("author", "username email name");
    apresentacao = await apresentacao.populate(
      "supervisor",
      "username email name"
    );
    apresentacao = await apresentacao.populate("categoria");
    apresentacao = await apresentacao.populate(
      "participantes",
      "username email name"
    );

    res.json(apresentacao);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no precesso de criacao de nova apresentacao");
  }
});

exports.getApresentacaoes = asyncHandler(async (req, res) => {
  try {
    let apresentacao = await Apresentacao.find()
      .populate("author", "username email name")
      .populate("supervisor", "username email name")
      .populate("categoria")
      .populate("participantes", "username email name");

    if (!apresentacao) {
      res.status(400);
      throw new Error("Nao existem apresentacoes ");
    }
    var reprovados = 0;
    var aprovados = 0;
    var pendentes = 0;
    var total = 0;
    apresentacao.forEach((apresentacao) => {
      if (apresentacao.status === "REPROVADO") reprovados++;
      if (apresentacao.status === "APROVADO") aprovados++;
      if (apresentacao.status === "PENDENTE") pendentes++;

      total++;
    });

    res.json({ data: apresentacao, reprovados, aprovados, pendentes, total });
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no precesso de Procura de novas apresentacoes");
  }
});
exports.getApresentacao = asyncHandler(async (req, res) => {
  try {
    const tema = req.query.search;
    let apresentacao = await Apresentacao.findOne({ tema })
      .populate("author", "username email name")
      .populate("supervisor", "username email name")
      .populate("categoria")
      .populate("participantes", "username email name");

    if (!apresentacao) {
      res.status(400);
      throw new Error("Nao existem apresentacao com esse nome ");
    }

    res.json(apresentacao);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no precesso de Procura de novas apresentacoes");
  }
});
exports.deleteApresentacao = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const apresentacao = await Apresentacao.findByIdAndDelete(id, {
      new: true,
    });

    if (!apresentacao) {
      res.status(400);
      throw new Error("Falha no precesso de delete de novas apresentacoes");
    }
    res.json(apresentacao);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no precesso de delete de novas apresentacoes");
  }
});
exports.updadeApresentacao = asyncHandler(async (req, res) => {
  try {
    const { idApresentacao, status } = req.body;
    const apresentacao = await Apresentacao.findByIdAndUpdate(
      idApresentacao,
      { status: status },
      {
        new: true,
      }
    )
      .populate("author", "username email name")
      .populate("supervisor", "username email name")
      .populate("categoria")
      .populate("participantes", "username email name");

    if (!apresentacao) {
      res.status(400);
      throw new Error("Falha no precesso de delete de novas apresentacoes");
    }
    res.json(apresentacao);
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error("Falha no precesso de delete de novas apresentacoes");
  }
});

exports.getMinhasApresentacoes = asyncHandler(async (req, res) => {
  try {
    const apresentacao = await Apresentacao.find({
      $or: [
        { author: req.user._id },
        { participantes: req.user._id },
        { supervisor: req.user._id },
      ],
    })
      .populate("author", "username email name")
      .populate("supervisor", "username email name")
      .populate("categoria")
      .populate("participantes", "username email name");

    // console.log();

    if (!apresentacao) {
      res.send("Nao tem apresentacoes");
    } else {
      res.json(apresentacao);
    }
  } catch (error) {
    res.status(400);
    console.log(error);
    throw new Error("falha no processo de procura de apresentacoes");
  }
});
