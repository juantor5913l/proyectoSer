// EmpleadosCrear.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIInvoke from "../../helpers/APIInvoke.js";
import mensajeConfirmacion from "../../helpers/mensajes.js";

const EmpleadosCrear = () => {
  const history = useNavigate();
  const [formulario, setFormulario] = useState({
    idRol: "",
    nombresEmpleado: "",
    celularEmpleado: "",
    correoEmpleado: "",
    direccionEmpleado: "",
    usuarioAcceso: "",
    claveAcceso: "",
    estadoEmpleado: 1,
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await APIInvoke.invokePOST("/api/empleados", formulario);
      if (response.ok === "SI") {
        mensajeConfirmacion("success", response.msg);
        history.push("/empleados-admin");
      } else {
        mensajeConfirmacion("error", response.msg);
      }
    } catch (error) {
      console.error("Error al crear empleado:", error);
    }
  };

  return (
    <main id="main" className="main">
      {/* ... (Encabezado y barra lateral) */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Crear Empleado</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="idRol" className="form-label">
                      Rol
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="idRol"
                      name="idRol"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nombresEmpleado" className="form-label">
                      Nombres
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombresEmpleado"
                      name="nombresEmpleado"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="celularEmpleado" className="form-label">
                      Celular
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="celularEmpleado"
                      name="celularEmpleado"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="correoEmpleado" className="form-label">
                      Correo
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="correoEmpleado"
                      name="correoEmpleado"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="direccionEmpleado" className="form-label">
                      Dirección
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="direccionEmpleado"
                      name="direccionEmpleado"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="usuarioAcceso" className="form-label">
                      Usuario de Acceso
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="usuarioAcceso"
                      name="usuarioAcceso"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="claveAcceso" className="form-label">
                      Clave de Acceso
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="claveAcceso"
                      name="claveAcceso"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="estadoEmpleado" className="form-label">
                      Estado
                    </label>
                    <select
                      className="form-select"
                      id="estadoEmpleado"
                      name="estadoEmpleado"
                      onChange={handleChange}
                      required
                    >
                      <option value="1">Activo</option>
                      <option value="0">Inactivo</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Crear Empleado
                  </button>
                  <Link to="/empleados-admin" className="btn btn-secondary ms-2">
                    Cancelar
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmpleadosCrear;
