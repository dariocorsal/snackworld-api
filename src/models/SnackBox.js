import mongoose from "mongoose";

const SnackBoxSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    pais: { type: String, required: true },
    descripcion: { type: String },
    imagen: { type: String }, // URL
    precio: { type: Number, required: true },
    productos: [String], // snacks dentro de la caja
    estrellas: {
      type: Number,
      default: null,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SnackBox", SnackBoxSchema);
