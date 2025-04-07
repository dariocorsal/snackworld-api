import jwt from "jsonwebtoken";

const autenticarUsuario = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ mensaje: "No se ha proporcionado un token" });
  }

  try {
    const usuarioVerificado = jwt.verify(token, "mi_clave_secreta");
    req.usuarioId = usuarioVerificado.usuarioId;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido" });
  }
};

export default autenticarUsuario;
