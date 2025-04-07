import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import snackBoxRoutes from "./routes/snackBoxRoutes.js";
import carritoRoutes from "./routes/carritoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

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

app.get("/", (req, res) => {
  res.send("🎉 Bienvenido a la API de SnackWorld");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
