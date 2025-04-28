import express from "express";
import {
  obtenerPerfil,
  actualizarPerfil,
  cambiarContrasena,
} from "../controllers/usuarioController.js";
import autenticarUsuario from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/perfil", autenticarUsuario, obtenerPerfil);
router.put("/perfil", autenticarUsuario, actualizarPerfil);
router.put("/contrasena", autenticarUsuario, cambiarContrasena);

export default router;
