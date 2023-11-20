import React, { useState, useEffect } from "react";
import ContentHeader from "../../componentes/contentHeader.jsx";
import Navbar from "../../componentes/navbar.jsx";
import SidebarContainer from "../../componentes/sidebarContainer.jsx";
import APIInvoke from "../../helpers/APIInvoke.js";
import { Link, useNavigate } from "react-router-dom";
import mensajeConfirmacion from "../../helpers/mensajes.js";

const TicketsCliente = () => {
  const navigate = useNavigate();
  const [arregloTickets, setArregloTickets] = useState([]);
  const clienteId = localStorage.getItem("iduser");

  const listadoTickets = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/api/tickets/cliente/${clienteId}`);
      console.log(response);
      setArregloTickets(response);
    } catch (error) {
      console.error("Error al obtener los tickets:", error);
    }
  };

  const verDetalles = (id) => {
    navigate(`/tickets-admin/${id}`);
  };

  const responderTicket = (id) => {
    navigate(`/responder-ticket/${id}`);
  };

  const borrar = async (e, id) => {
    e.preventDefault();

    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este ticket?"
    );

    if (!confirmacion) {
      return;
    }

    try {
      const response = await APIInvoke.invokeDELETE(`/api/tickets/${id}`);

      if (response.ok === "SI") {
        mensajeConfirmacion("success", response.msg);
        listadoTickets(); // Actualizar la lista de tickets después de la eliminación exitosa
      } else {
        mensajeConfirmacion("error", response.msg);
      }
    } catch (error) {
      console.error("Error al eliminar el ticket:", error);
      mensajeConfirmacion("error", "Error al eliminar el ticket");
    }
  };

  useEffect(() => {
    listadoTickets();
  }, []);

  
    return (
      <main id="main" className="main">
        <main id="main" className="main">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <ContentHeader
        titulo={"Tickets"}
        breadCrumb1={"Tickets"}
        breadCrumb2={"Lista Tickets"}
        breadCrumb3={""}
        ruta={"/tickets-admin"}
      />
      {/* Main content */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Listado Tickets</h5>
                <div className="row mb-3">
                  <div className="col-lg-12">
                    <Link to={"/tickets-crear"} className="btn btn-primary">
                      Crear
                    </Link>
                  </div>
                </div>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th style={{ width: "15%", textAlign: "center" }}>
                        Nro Ticket
                      </th>
                      <th style={{ width: "25%", textAlign: "center" }}>
                        Cliente
                      </th>
                      <th style={{ width: "30%", textAlign: "center" }}>
                        Descripcion del ticket
                      </th>
                      <th style={{ width: "30%", textAlign: "center" }}>
                        Categoria
                      </th>
                      <th style={{ width: "10%", textAlign: "center" }}>
                        Estado
                      </th>
                      <th style={{ width: "20%", textAlign: "center" }}>
                        Opciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {arregloTickets.map((elemento) => (
                      <tr key={elemento._id}>
                        <td
                          style={{
                            textAlign: "center",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => verDetalles(elemento._id)}
                        >
                          {elemento._id}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {elemento.idCliente &&
                            elemento.idCliente.nombresUsuario}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {elemento.idCliente &&
                            elemento.descripcionTicket}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {elemento.idCategoria &&
                            elemento.idCategoria.nombreCategoria}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {elemento.estadoTicket}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <Link
                            to={`/tickets-editar/${elemento._id}`}
                            className="btn btn-primary btn-sm"
                          >
                            <i
                              className="bi bi-pencil-square"
                              title="Editar"
                            ></i>
                          </Link>
                          &nbsp;
                          <button
                            onClick={(e) => borrar(e, elemento._id)}
                            className="btn btn-danger btn-sm"
                          >
                            <i
                              className="bi bi-trash-fill"
                              title="Borrar"
                            ></i>
                          </button>
                          &nbsp;
                          <button
                            onClick={() => responderTicket(elemento._id)}
                            className="btn btn-success btn-sm"
                          >
                          Responder
                        </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
      </main>
    );
  };
  
  export default TicketsCliente;