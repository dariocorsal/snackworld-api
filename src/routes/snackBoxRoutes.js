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

router.get("/", obtenerCajas);
router.post("/", crearCaja);
router.get("/:id", obtenerCajaPorId);
router.delete("/:id", eliminarCaja);
router.get("/populares", obtenerPopulares);
router.get("/buscar", buscarCajas);
router.put("/:id", autenticarUsuario, verificarAdmin, editarCaja);

export default router;
