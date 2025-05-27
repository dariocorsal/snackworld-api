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
      return res.status(200).json({ mensaje: "Sin suscripción activa" });
    }

    const { tipo, inicio, fin } = usuario.suscripcion;

    res.status(200).json({ tipo, inicio, fin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerTotalSuscripcionesActivas = async (req, res) => {
  try {
    const hoy = new Date();

    const totalActivas = await Usuario.countDocuments({
      "suscripcion.fin": { $gt: hoy },
    });

    res.status(200).json({ totalActivas });
  } catch (error) {
    res
      .status(500)
      .json({
        mensaje: "Error al obtener suscripciones activas",
        error: error.message,
      });
  }
};

export const calcularIngresosEsperados = async (req, res) => {
  try {
    const hoy = new Date();

    const activas = await Usuario.find({
      "suscripcion.fin": { $gt: hoy },
    });

    let total = 0;

    for (const usuario of activas) {
      const tipo = usuario.suscripcion?.tipo;
      if (tipo === "mensual") total += 25;
      else if (tipo === "semestral") total += 22;
      else if (tipo === "anual") total += 20;
    }

    res.status(200).json({ ingresosEsperados: `$${total}` });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al calcular ingresos", error: error.message });
  }
};
