const mongoose = require("mongoose");

const categoriaSchema = mongoose.Schema({
  nome: String,
  departamento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departamento",
    require: "true",
  },
});

const Categoria = mongoose.model("categoria", categoriaSchema);

module.exports = Categoria;
