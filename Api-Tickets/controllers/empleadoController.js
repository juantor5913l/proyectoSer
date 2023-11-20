import Empleado from "../models/empleado.js";
import generarJWT from "../helpers/generarJWT.js";

const agregarEmpleado = async (req, res) => {
  const { usuarioAcceso } = req.body;
  const existeEmpleado = await Empleado.findOne({ usuarioAcceso });

  if (existeEmpleado) {
    const error = new Error("Empleado ya está registrado en la base de datos");
    return res.status(400).json({ msg: error.message, ok: "NO" });
  }

  try {
    const empleado = new Empleado(req.body);
    const empleadoGuardado = await empleado.save();
    res.json({
      body: empleadoGuardado,
      ok: "SI",
      msg: "Registro creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor", ok: "NO" });
  }
};

const listarEmpleados = async (req, res) => {
  const empleados = await Empleado.find().populate("idRol", {
    nombreRol: 1,
    _id: 0,
  });
  res.json(empleados);
};

const eliminarEmpleado = async (req, res) => {
  const { id } = req.params;

  const empleado = await Empleado.findById(id);

  if (!empleado) {
    const error = new Error("Registro no encontrado");
    return res.status(404).json({ msg: error.message, ok: "NO" });
  }

  try {
    await empleado.deleteOne();
    res.json({ msg: "Registro eliminado correctamente", ok: "SI" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor", ok: "NO" });
  }
};

const editarEmpleado = async (req, res) => {
  const { id } = req.params;

  const empleado = await Empleado.findById(id);

  if (!empleado) {
    const error = new Error("Registro no encontrado");
    return res.status(404).json({ msg: error.message, ok: "NO" });
  }

  // Actualizar las propiedades del empleado según los datos proporcionados en la solicitud
  empleado.idRol = req.body.idRol || empleado.idRol;
  empleado.nombresEmpleado = req.body.nombresEmpleado || empleado.nombresEmpleado;
  empleado.celularEmpleado = req.body.celularEmpleado || empleado.celularEmpleado;
  empleado.correoEmpleado = req.body.correoEmpleado || empleado.correoEmpleado;
  empleado.direccionEmpleado = req.body.direccionEmpleado || empleado.direccionEmpleado;
  empleado.usuarioAcceso = req.body.usuarioAcceso || empleado.usuarioAcceso;
  empleado.claveAcceso = req.body.claveAcceso || empleado.claveAcceso;
  empleado.estadoEmpleado = req.body.estadoEmpleado || empleado.estadoEmpleado;

  try {
    const empleadoGuardado = await empleado.save();
    res.json({
      body: empleadoGuardado,
      msg: "Documento actualizado correctamente",
      ok: "SI",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor", ok: "NO" });
  }
};

const listarUnEmpleado = async (req, res) => {
  const { id } = req.params;

  const empleado = await Empleado.findById(id);

  if (!empleado) {
    const error = new Error("Registro no encontrado");
    return res.status(404).json({ msg: error.message, ok: "NO" });
  }
  res.json(empleado);
};

const autenticarEmpleado = async (req, res) => {
  const { usuarioAcceso, claveAcceso } = req.body;
  const empleado = await Empleado.findOne({ usuarioAcceso });

  if (!empleado) {
    const error = new Error("El empleado no existe");
    return res.status(404).json({ msg: error.message, ok: "NO_EXISTE" });
  }

  if (await empleado.comprobarClave(claveAcceso)) {
    res.json({
      _id: empleado._id,
      nombresEmpleado: empleado.nombresEmpleado,
      usuarioAcceso: empleado.usuarioAcceso,
      idRol: empleado.idRol,
      tokenJwt: generarJWT(empleado._id),
    });
  } else {
    const error = new Error("La clave es incorrecta");
    res.json({ msg: error.message, ok: "CLAVE_ERRONEA" });
  }
};

const crearCuentaEmpleado = async (req, res) => {
  const { usuarioAcceso } = req.body;
  const existeEmpleado = await Empleado.findOne({ usuarioAcceso });

  if (existeEmpleado) {
    const error = new Error("Empleado ya está registrado en la base de datos");
    return res.status(400).json({ msg: error.message, ok: "NO" });
  }

  try {
    const empleado = new Empleado(req.body);
    const empleadoGuardado = await empleado.save();
    res.json({
      body: empleadoGuardado,
      ok: "SI",
      msg: "Registro creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error interno del servidor", ok: "NO" });
  }
};

export {
  agregarEmpleado,
  listarEmpleados,
  eliminarEmpleado,
  editarEmpleado,
  listarUnEmpleado,
  autenticarEmpleado,
  crearCuentaEmpleado,
};
