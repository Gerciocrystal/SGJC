const mongoose = require("mongoose");

const apresentacaoSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    status: {
      type: String,
      uppercase: true,
      default: "PENDENTE",
    },
    participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    tema: { type: String, unique: true, require: true },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    arquivo_path: { type: String, required: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: "categoria" },
  },
  { timestamps: true }
);
const Apresentacao = mongoose.model("apresentacao", apresentacaoSchema);

module.exports = Apresentacao;
