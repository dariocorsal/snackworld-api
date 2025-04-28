import mongoose from "mongoose";
const opinionSchema = new mongoose.Schema(
  {
    comentario: String,
    calificacion: { type: Number, min: 1, max: 5 },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    caja: { type: mongoose.Schema.Types.ObjectId, ref: "SnackBox" },
  },
  { timestamps: true }
);
export default mongoose.model("Opinion", opinionSchema);
