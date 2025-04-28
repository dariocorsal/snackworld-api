import express from "express";
import {
  agregarOpinion,
  obtenerOpiniones,
} from "../controllers/opinionController.js";
import autenticarUsuario from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:cajaId", autenticarUsuario, agregarOpinion);
router.get("/:cajaId", obtenerOpiniones);

export default router;
