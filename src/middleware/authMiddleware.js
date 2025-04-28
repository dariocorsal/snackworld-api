import jwt from "jsonwebtoken";

const autenticarUsuario = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ mensaje: "No se ha proporcionado un token" });
  }

  // Dividir el header en ["Bearer", "eyJhbGciOi..."]
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensaje: "Token no válido" });
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
