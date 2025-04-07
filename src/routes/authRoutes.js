import express from "express";
import { registrarUsuario, iniciarSesion } from "../controllers/auth.js";

const router = express.Router();

// Ruta para registrar usuarios
router.post("/registro", registrarUsuario);

// Ruta para iniciar sesión
router.post("/login", iniciarSesion);

export default router;
