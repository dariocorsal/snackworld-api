import Opinion from "../models/Opinion.js";
import SnackBox from "../models/SnackBox.js";

export const agregarOpinion = async (req, res) => {
  const { comentario, calificacion } = req.body;

  const yaOpino = await Opinion.findOne({
    usuario: req.usuarioId,
    caja: req.params.cajaId,
  });

  if (yaOpino) {
    return res
      .status(400)
      .json({ mensaje: "Ya enviaste una opinión para esta caja" });
  }

  if (calificacion < 1 || calificacion > 5 || !comentario) {
    return res.status(400).json({ mensaje: "Datos inválidos para la opinión" });
  }

  const opinion = new Opinion({
    comentario,
    calificacion,
    caja: req.params.cajaId,
    usuario: req.usuarioId,
  });

  await opinion.save();

  // 🔁 Recalcular promedio
  const opiniones = await Opinion.find({ caja: req.params.cajaId });

  const suma = opiniones.reduce((acc, op) => acc + op.calificacion, 0);
  const promedio = suma / opiniones.length;

  // 📦 Actualizar caja con nuevo promedio
  await SnackBox.findByIdAndUpdate(req.params.cajaId, {
    estrellas: promedio.toFixed(2),
  });

  res.status(201).json(opinion);
};
