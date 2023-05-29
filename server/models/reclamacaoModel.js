const mongoose = require("mongoose");

const reclamacaoSchema = mongoose.Schema({
  nome: { type: String },
  cod_estudante: { type: String, require: true },
  status: { type: String, default: "PENDENTE" },
  email: { type: String, lowercase: true },
  contacto: { type: String },
  problema: { type: String },
  descricao: { type: String },
});

const Reclamacao = mongoose.model("reclamacao", reclamacaoSchema);

module.exports = Reclamacao;
