import express from "express";
import {
  obtenerCajas,
  crearCaja,
  obtenerCajaPorId,
  eliminarCaja,
} from "../controllers/snackBoxController.js";

const router = express.Router();

router.get("/", obtenerCajas);
router.post("/", crearCaja);
router.get("/:id", obtenerCajaPorId);
router.delete("/:id", eliminarCaja);

export default router;
