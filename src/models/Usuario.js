import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  direccion: {
    type: String,
    default: "",
  },
  rol: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
  },
  favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: "SnackBox" }],
  suscripcion: {
    tipo: {
      type: String,
      enum: ["mensual", "trimestral", "semestral", "anual"],
      default: null,
    },
    inicio: Date,
    fin: Date,
  },
});

// Encriptar la contraseña
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contrasena")) return next(); // Solo encriptar si contraseña fue modificada
  this.contrasena = await bcrypt.hash(this.contrasena, 10); // Encriptar con bcrypt
  next();
});

// Comparar contraseñas
usuarioSchema.methods.compararContrasena = function (contrasena) {
  return bcrypt.compare(contrasena, this.contrasena);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
