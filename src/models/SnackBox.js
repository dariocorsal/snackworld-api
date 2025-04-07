import mongoose from "mongoose";

const SnackBoxSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    pais: { type: String, required: true },
    descripcion: { type: String },
    imagen: { type: String }, // URL
    precio: { type: Number, required: true },
    productos: [String], // snacks dentro de la caja
  },
  { timestamps: true }
);

export default mongoose.model("SnackBox", SnackBoxSchema);
