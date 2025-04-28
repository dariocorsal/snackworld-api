import express from "express";
import {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
} from "../controllers/carritoController.js";
import autenticarUsuario from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/agregar", autenticarUsuario, agregarAlCarrito);
router.get("/obtener", autenticarUsuario, obtenerCarrito);
router.delete("/eliminar/:snackBoxId", autenticarUsuario, eliminarDelCarrito);

export default router;
