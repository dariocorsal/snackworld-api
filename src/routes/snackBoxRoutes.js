import express from "express";
import {
  obtenerCajas,
  crearCaja,
  obtenerCajaPorId,
  eliminarCaja,
  obtenerPopulares,
  buscarCajas,
  editarCaja,
} from "../controllers/snackBoxController.js";
import autenticarUsuario from "../middleware/authMiddleware.js";
import verificarAdmin from "../middleware/rolAdmin.js";

const router = express.Router();

router.get("/populares", obtenerPopulares);
router.get("/buscar", buscarCajas);
router.get("/", obtenerCajas);
router.get("/:id", obtenerCajaPorId);
router.post("/", crearCaja);
router.delete("/:id", autenticarUsuario, verificarAdmin, eliminarCaja);
router.put("/:id", autenticarUsuario, verificarAdmin, editarCaja);

export default router;
