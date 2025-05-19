import SnackBox from "../models/SnackBox.js";

export const obtenerCajas = async (req, res) => {
  const cajas = await SnackBox.find();
  res.json(cajas);
};

export const crearCaja = async (req, res) => {
  const nuevaCaja = new SnackBox(req.body);
  await nuevaCaja.save();
  res.status(201).json(nuevaCaja);
};

export const obtenerCajaPorId = async (req, res) => {
  const caja = await SnackBox.findById(req.params.id);
  if (!caja) return res.status(404).json({ mensaje: "Caja no encontrada" });
  res.json(caja);
};

export const eliminarCaja = async (req, res) => {
  await SnackBox.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Caja eliminada" });
};

import SnackBox from "../models/SnackBox.js";
import Opinion from "../models/Opinion.js";

export const obtenerPopulares = async (req, res) => {
  try {
    const cajas = await SnackBox.find();

    // Calcular promedios de estrellas dinámicamente
    const cajasConEstrellas = await Promise.all(
      cajas.map(async (caja) => {
        const opiniones = await Opinion.find({ caja: caja._id });
        if (opiniones.length > 0) {
          const promedio =
            opiniones.reduce((sum, o) => sum + o.calificacion, 0) /
            opiniones.length;
          caja.estrellas = Math.round(promedio * 10) / 10; // Ej: 3.6
        } else {
          caja.estrellas = null;
        }
        return caja;
      })
    );

    // Ordenar por estrellas (mayor a menor) y tomar las primeras 10
    const cajasPopulares = cajasConEstrellas
      .filter((caja) => caja.estrellas !== null)
      .sort((a, b) => b.estrellas - a.estrellas)
      .slice(0, 10);

    res.json(cajasPopulares);
  } catch (error) {
    console.error("Error al obtener cajas populares:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const buscarCajas = async (req, res) => {
  const q = req.query.q;
  const cajas = await SnackBox.find({
    $or: [
      { nombre: { $regex: q, $options: "i" } },
      { descripcion: { $regex: q, $options: "i" } },
      { pais: { $regex: q, $options: "i" } },
    ],
  });
  res.json(cajas);
};

export const editarCaja = async (req, res) => {
  const caja = await SnackBox.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(caja);
};
