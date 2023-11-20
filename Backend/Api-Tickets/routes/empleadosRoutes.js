import express from "express";
import {
  agregarEmpleado,
  listarEmpleados,
  eliminarEmpleado,
  editarEmpleado,
  listarUnEmpleado,
  autenticarEmpleado,
  crearCuentaEmpleado
} from "../controllers/empleadoController.js";
import validarAutenticacion from "../middleware/validarAutenticacion.js";

const router = express.Router();

/* Rutas privadas para empleados */
router.get("/empleados", validarAutenticacion, listarEmpleados);
router.get("/empleados/:id", validarAutenticacion, listarUnEmpleado);
router.post("/empleados", validarAutenticacion, agregarEmpleado);
router.put("/empleados/:id", validarAutenticacion, editarEmpleado);
router.delete("/empleados/:id", validarAutenticacion, eliminarEmpleado);

/* Rutas públicas para el inicio de sesión y crear una cuenta de empleado */
router.post("/empleados/login", autenticarEmpleado);
router.post("/empleados/crear-cuenta", crearCuentaEmpleado);

export default router;
