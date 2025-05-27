import express from "express";
import {
  activarSuscripcion,
  obtenerSuscripcion,
  obtenerTotalSuscripcionesActivas,
  calcularIngresosEsperados,
} from "../controllers/suscripcionController.js";
import autenticarUsuario from "../middleware/authMiddleware.js";
import autenticarUsuario from "../middleware/authMiddleware.js";
import verificarAdmin from "../middleware/rolAdmin.js";

const router = express.Router();

router.use(autenticarUsuario);

router.get("/activas", obtenerTotalSuscripcionesActivas);

router.get("/ingresos", verificarAdmin, calcularIngresosEsperados);

router.post("/", activarSuscripcion);

router.get("/", obtenerSuscripcion);

export default router;
