import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

export const obtenerPerfil = async (req, res) => {
  const usuario = await Usuario.findById(req.usuarioId).select("-contrasena");
  res.json(usuario);
};

export const actualizarPerfil = async (req, res) => {
  const { nombre, correo, direccion } = req.body;
  const usuario = await Usuario.findByIdAndUpdate(
    req.usuarioId,
    { nombre, correo, direccion },
    { new: true }
  );
  res.json(usuario);
};

export const cambiarContrasena = async (req, res) => {
  const { contrasena } = req.body;
  const usuario = await Usuario.findById(req.usuarioId);

  const salt = await bcrypt.genSalt(10);
  usuario.contrasena = await bcrypt.hash(contrasena, salt);

  usuario.contrasena = contrasena;
  await usuario.save();
  res.json({ mensaje: "Contraseña actualizada" });
};
