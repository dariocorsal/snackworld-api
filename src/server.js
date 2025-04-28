import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import snackBoxRoutes from "./routes/snackBoxRoutes.js";
import carritoRoutes from "./routes/carritoRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import favoritosRoutes from "./routes/favoritosRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import opinionRoutes from "./routes/opinionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import subscriptionRoutes from "./routes/suscripcionRoutes.js";

import autenticarUsuario from "./middleware/authMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/carrito", carritoRoutes);
app.use("/api/cajas", snackBoxRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/carrito", autenticarUsuario, carritoRoutes);
app.use("/api/favoritos", favoritosRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/opiniones", opinionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/subscription", subscriptionRoutes);

app.get("/", (req, res) => {
  res.send("Snackworld API corriendo correctamente");
});

// Vercel no usa app.listen(), entonces debes exportar el app para que lo maneje el entorno serverless.
export default app;
