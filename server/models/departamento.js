const mongoose = require("mongoose");

const departamentoSchema = mongoose.Schema({
  nome: { type: String, require: true, unique: true },
  sigla: { type: String, uppercase: true, unique: true },
});
const Departamento = mongoose.model("departamento", departamentoSchema);

module.exports = Departamento;
