const mongoose = require("mongoose");

const alumisSchema = mongoose.Schema({
  nome: { type: String, require: true },
  cod_estudante: { type: String, require: true, unique: true },
  ano_entrada: { type: Number, required: true },
  email: { type: String, require: true, unique: true },
  status: { type: Boolean, default: false },
  departamento: { type: mongoose.Schema.Types.ObjectId, ref: "departamento" },
});

const Alumini = mongoose.model("alumini", alumisSchema);

module.exports = Alumini;
