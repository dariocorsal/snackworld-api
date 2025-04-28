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

export const obtenerPopulares = async (req, res) => {
  const cajas = await SnackBox.find().sort({ estrellas: -1 }).limit(10);
  res.json(cajas);
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
