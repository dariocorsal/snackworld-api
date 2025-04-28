import express from "express";
import {
  obtenerUsuarios,
  obtenerPedidos,
  eliminarUsuario,
} from "../controllers/adminController.js";
import autenticarUsuario from "../middleware/authMiddleware.js";
import verificarAdmin from "../middleware/rolAdmin.js";

const router = express.Router();

router.get("/usuarios", autenticarUsuario, verificarAdmin, obtenerUsuarios);
router.get("/pedidos", autenticarUsuario, verificarAdmin, obtenerPedidos);
router.delete(
  "/usuarios/:id",
  autenticarUsuario,
  verificarAdmin,
  eliminarUsuario
);

export default router;
