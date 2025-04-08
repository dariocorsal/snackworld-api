import express from "express";
import {
  activarSuscripcion,
  obtenerSuscripcion,
} from "../controllers/suscripcionController.js";
import autenticarUsuario from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(autenticarUsuario);

// POST /api/suscripcion, activar o renovar suscripción
router.post("/", activarSuscripcion);

// GET /api/suscripcion, consultar suscripción actual
router.get("/", obtenerSuscripcion);

export default router;
