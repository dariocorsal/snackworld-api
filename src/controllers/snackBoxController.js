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
