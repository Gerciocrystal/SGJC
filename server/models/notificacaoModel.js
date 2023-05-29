const mongoose = require("mongoose");

const notificacaoSchema = mongoose.Schema(
  {
    tipo: { type: String, require: true, uppercase: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    descricao: { type: String, require: true },
    visualizada: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notificacao = mongoose.model("notificacao", notificacaoSchema);

module.exports = Notificacao;
