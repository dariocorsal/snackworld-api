import Usuario from "../models/Usuario.js";
import SnackBox from "../models/SnackBox.js";

// Agregar a favoritos
export const agregarFavorito = async (req, res) => {
  const { idCaja } = req.params;
  const usuarioId = req.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    if (usuario.favoritos.includes(idCaja)) {
      return res.status(400).json({ mensaje: "Ya está en favoritos" });
    }

    usuario.favoritos.push(idCaja);
    await usuario.save();

    res.status(200).json({ mensaje: "Caja añadida a favoritos" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Quitar de favoritos
export const quitarFavorito = async (req, res) => {
  const { idCaja } = req.params;
  const usuarioId = req.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    usuario.favoritos = usuario.favoritos.filter(
      (id) => id.toString() !== idCaja
    );
    await usuario.save();

    res.status(200).json({ mensaje: "Caja eliminada de favoritos" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener favoritos del usuario
export const obtenerFavoritos = async (req, res) => {
  const usuarioId = req.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId).populate("favoritos");
    if (!usuario)
      return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.status(200).json(usuario.favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
