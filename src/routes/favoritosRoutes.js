import express from "express";
import {
  agregarFavorito,
  quitarFavorito,
  obtenerFavoritos,
} from "../controllers/favoritosController.js";
import autenticarUsuario from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(autenticarUsuario); // Todas las rutas requieren autenticación

// GET /api/favoritos, lista de cajas favoritas
router.get("/", obtenerFavoritos);

// POST /api/favoritos/:idCaja, agregar a favoritos
router.post("/:idCaja", agregarFavorito);

// DELETE /api/favoritos/:idCaja, quitar de favoritos
router.delete("/:idCaja", quitarFavorito);

export default router;
