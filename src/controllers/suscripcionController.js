import Usuario from "../models/Usuario.js";

// Activar una suscripción
export const activarSuscripcion = async (req, res) => {
  const { tipo } = req.body; // mensual, trimestral o anual
  const usuarioId = req.usuarioId;

  const duraciones = {
    mensual: 30,
    trimestral: 90,
    anual: 365,
  };

  if (!duraciones[tipo]) {
    return res.status(400).json({ mensaje: "Tipo de suscripción inválido" });
  }

  try {
    const inicio = new Date();
    const fin = new Date(inicio);
    fin.setDate(inicio.getDate() + duraciones[tipo]);

    const usuario = await Usuario.findByIdAndUpdate(
      usuarioId,
      {
        suscripcion: { tipo, inicio, fin },
      },
      { new: true }
    );

    res.status(200).json({
      mensaje: "Suscripción activada",
      suscripcion: usuario.suscripcion,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener el estado de la suscripción
export const obtenerSuscripcion = async (req, res) => {
  const usuarioId = req.usuarioId;

  try {
    const usuario = await Usuario.findById(usuarioId);

    if (!usuario || !usuario.suscripcion?.tipo) {
      return res.status(404).json({ mensaje: "Sin suscripción activa" });
    }

    const { tipo, inicio, fin } = usuario.suscripcion;

    res.status(200).json({ tipo, inicio, fin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
