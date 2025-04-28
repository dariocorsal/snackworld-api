import Carrito from "../models/Carrito.js";

// Agregar un artículo al carrito
export const agregarAlCarrito = async (req, res) => {
  const { snackBoxId, cantidad } = req.body;
  const usuarioId = req.usuarioId; // Suponiendo que el usuario está autenticado

  try {
    // Verificar si el carrito ya existe para el usuario
    let carrito = await Carrito.findOne({ usuarioId });

    if (!carrito) {
      // Si no existe, crear uno nuevo
      carrito = new Carrito({
        usuarioId,
        snackBoxes: [{ snackBoxId, cantidad }],
      });
    } else {
      // Si existe, buscar el snackBox dentro del carrito
      const index = carrito.snackBoxes.findIndex(
        (item) => item.snackBoxId.toString() === snackBoxId
      );

      if (index === -1) {
        // Si no lo encuentra, agregarlo
        carrito.snackBoxes.push({ snackBoxId, cantidad });
      } else {
        // Si lo encuentra, actualizar la cantidad
        carrito.snackBoxes[index].cantidad += cantidad;
      }
    }

    await carrito.save();
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener los artículos del carrito
export const obtenerCarrito = async (req, res) => {
  const usuarioId = req.usuarioId; // Suponiendo que el usuario está autenticado

  try {
    const carrito = await Carrito.findOne({ usuarioId }).populate(
      "snackBoxes.snackBoxId"
    );
    if (!carrito)
      return res.status(404).json({ message: "Carrito vacío o no encontrado" });
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un artículo del carrito
export const eliminarDelCarrito = async (req, res) => {
  const { snackBoxId } = req.params;
  const usuarioId = req.usuarioId;

  try {
    const carrito = await Carrito.findOne({ usuarioId });

    if (!carrito) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    carrito.snackBoxes = carrito.snackBoxes.filter(
      (item) => item.snackBoxId.toString() !== snackBoxId
    );

    await carrito.save();
    res.status(200).json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
