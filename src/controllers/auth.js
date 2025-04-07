import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

// Registro de usuario
export const registrarUsuario = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  try {
    // Verificar si ya existe el correo
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Crear un nuevo usuario
    const usuario = new Usuario({ nombre, correo, contrasena });
    await usuario.save();

    res.status(201).json({ mensaje: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Iniciar sesión
export const iniciarSesion = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Comparar las contraseñas
    const esValida = await usuario.compararContrasena(contrasena);
    if (!esValida) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { usuarioId: usuario._id, nombre: usuario.nombre },
      "mi_clave_secreta", // Clave secreta
      { expiresIn: "1h" } // El token expirará en 1 hora
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
