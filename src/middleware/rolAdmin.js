import Usuario from "../models/Usuario.js";

const verificarAdmin = async (req, res, next) => {
  if (req.usuarioId) {
    const usuario = await Usuario.findById(req.usuarioId);
    if (usuario.rol === "admin") return next();
  }
  return res.status(403).json({ mensaje: "Acceso restringido" });
};
export default verificarAdmin;
