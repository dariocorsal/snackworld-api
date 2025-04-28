import Usuario from "../models/Usuario.js";
import Pedido from "../models/Pedido.js";

export const obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
};

export const eliminarUsuario = async (req, res) => {
  await Usuario.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Usuario eliminado" });
};

export const obtenerPedidos = async (req, res) => {
  const pedidos = await Pedido.find().populate("usuario");
  res.json(pedidos);
};
