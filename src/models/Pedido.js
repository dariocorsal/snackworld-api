import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  items: [
    {
      snackBox: { type: mongoose.Schema.Types.ObjectId, ref: "SnackBox" },
      cantidad: Number,
    },
  ],
  total: Number,
  fecha: { type: Date, default: Date.now },
});
export default mongoose.model("Pedido", pedidoSchema);
