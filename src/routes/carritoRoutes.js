import express from "express";
import {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
} from "../controllers/carritoController.js";

const router = express.Router();

router.post("/agregar", agregarAlCarrito);
router.get("/obtener", obtenerCarrito);
router.delete("/eliminar/:snackBoxId", eliminarDelCarrito);

export default router;
