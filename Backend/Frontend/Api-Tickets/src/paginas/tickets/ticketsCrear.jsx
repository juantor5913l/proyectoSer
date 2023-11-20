import React, { useState, useEffect } from "react";
import ContentHeader from "../../componentes/contentHeader.jsx";
import Navbar from "../../componentes/navbar.jsx";
import SidebarContainer from "../../componentes/sidebarContainer.jsx";
import APIInvoke from "../../helpers/APIInvoke.js";
import { useNavigate } from "react-router-dom";
import mensajeConfirmacion from "../../helpers/mensajes.js";
import Form from "react-bootstrap/Form";
import dominios from "../../helpers/dominios.js";

const TicketsCrear = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("iduser");
  const initialCliente = userId ? userId : "-8";

  const [ticket, setTicket] = useState({
    categoria: "-8",
    cliente: initialCliente,
    correo: "",
    asunto: "",
    descripcion: "",
    estado: dominios.ESTADO_TICKET_ABIERTO,
  });

  const { categoria, asunto, descripcion, correo } = ticket;
  const [arregloCategorias, setArregloCategorias] = useState([]);

  const comboCategoria = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/api/categorias`);
      setArregloCategorias(response);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await crear();
  };

  const crear = async () => {
    try {
      const body = {
        idCategoria: ticket.categoria,
        idCliente: ticket.cliente,
        correoTicket: ticket.correo,
        asuntoTicket: ticket.asunto,
        descripcionTicket: ticket.descripcion,
        estadoTicket: ticket.estado,
      };

      const response = await APIInvoke.invokePOST(`/api/tickets/crear-tickets`, body);
      console.log("Respuesta del servidor:", response);

      if (response.ok === "SI") {
        mensajeConfirmacion("success", "Ticket creado exitosamente.");
        navigate("/tickets-admin");
      } else {
        mensajeConfirmacion("error", response.msg || "Hubo un error al crear el ticket.");
      }

      resetForm();
    } catch (error) {
      console.error("Error al crear el ticket:", error);
      mensajeConfirmacion("error", "Hubo un error al crear el ticket.");
    }
  };

  const resetForm = () => {
    setTicket({
      categoria: "-8",
      cliente: initialCliente,
      correo: "",
      asunto: "",
      descripcion: "",
      estado: dominios.ESTADO_TICKET_ABIERTO,
    });
  };

  useEffect(() => {
    comboCategoria();
    document.getElementById("categoria").focus();
  }, []);

  return (
    <main id="main" className="main">
      <Navbar />
      <SidebarContainer />
      <ContentHeader
        titulo={"Tickets"}
        breadCrumb1={"Tickets"}
        breadCrumb2={"Listado Tickets"}
        breadCrumb3={"Crear Tickets"}
        ruta={"/tickets-admin"}
      />
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <form onSubmit={onSubmit}>
                <div className="card-body">
                  <h5 className="card-title">Crear Tickets</h5>

                  <div className="row mb-3">
                    <label htmlFor="categoria" className="col-sm-2 col-form-label">
                      Seleccione una Categoría
                    </label>
                    <div className="col-sm-10">
                      <Form.Select
                        aria-label="Default select example"
                        style={{ cursor: "pointer" }}
                        id="categoria"
                        name="categoria"
                        value={categoria}
                        onChange={onChange}
                      >
                        <option value="-8">Seleccione</option>
                        {arregloCategorias.map((opcion) => (
                          <option key={opcion._id} value={opcion._id}>
                            {opcion.nombreCategoria}
                          </option>
                        ))}
                      </Form.Select>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="correo" className="col-sm-2 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="email"
                        className="form-control"
                        id="correo"
                        name="correo"
                        value={correo}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="asunto" className="col-sm-2 col-form-label">
                      Asunto
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="asunto"
                        name="asunto"
                        value={asunto}
                        onChange={onChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="descripcion" className="col-sm-2 col-form-label">
                      Descripción
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={onChange}
                        rows="10"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                  <button type="reset" className="btn btn-default float-right">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default TicketsCrear;
