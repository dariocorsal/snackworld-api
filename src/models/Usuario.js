import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Esquema para el usuario
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: "SnackBox" }],
  suscripcion: {
    tipo: {
      type: String,
      enum: ["mensual", "trimestral", "anual"],
      default: null,
    },
    inicio: Date,
    fin: Date,
  },
});

// Método para encriptar la contraseña
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contrasena")) return next(); // Solo encriptar si la contraseña fue modificada
  this.contrasena = await bcrypt.hash(this.contrasena, 10); // Encriptar con bcrypt
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContrasena = function (contrasena) {
  return bcrypt.compare(contrasena, this.contrasena);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
