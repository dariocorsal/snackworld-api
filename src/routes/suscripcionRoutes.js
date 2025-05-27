import express from "express";
import {
  activarSuscripcion,
  obtenerSuscripcion,
} from "../controllers/suscripcionController.js";
import autenticarUsuario from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(autenticarUsuario);

router.post("/", activarSuscripcion);

router.get("/", obtenerSuscripcion);

router.get("/activas", autenticarUsuario, obtenerTotalSuscripcionesActivas);

router.get("/ingresos", autenticarUsuario, esAdmin, calcularIngresosEsperados);

export default router;
