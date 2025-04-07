import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // Suponiendo que tienes un modelo de Usuario
      required: true,
    },
    snackBoxes: [
      {
        snackBoxId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SnackBox", // Suponiendo que tienes un modelo de SnackBox
          required: true,
        },
        cantidad: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Carrito = mongoose.model("Carrito", carritoSchema);

export default Carrito;
