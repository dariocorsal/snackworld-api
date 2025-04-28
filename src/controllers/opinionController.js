import Opinion from "../models/Opinion.js";

export const agregarOpinion = async (req, res) => {
  const { comentario, calificacion } = req.body;

  const yaOpino = await Opinion.findOne({
    usuario: req.usuarioId,
    caja: req.params.cajaId,
  });

  const opinion = new Opinion({
    comentario,
    calificacion,
    caja: req.params.cajaId,
    usuario: req.usuarioId,
  });

  if (yaOpino) {
    return res
      .status(400)
      .json({ mensaje: "Ya enviaste una opinión para esta caja" });
  } else if (calificacion < 1 || calificacion > 5 || !comentario) {
    return res.status(400).json({ mensaje: "Datos inválidos para la opinión" });
  } else {
    await opinion.save();
    res.status(201).json(opinion);
  }
};

export const obtenerOpiniones = async (req, res) => {
  const opiniones = await Opinion.find({ caja: req.params.cajaId }).populate(
    "usuario",
    "nombre"
  );
  res.json(opiniones);
};
