import React, { useState, useEffect } from "react";
import ContentHeader from "../../componentes/contentHeader.jsx";
import Navbar from "../../componentes/navbar.jsx";
import SidebarContainer from "../../componentes/sidebarContainer.jsx";
import APIInvoke from "../../helpers/APIInvoke.js";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import mensajeConfirmacion from "../../helpers/mensajes.js";

const TicketsAdmin = () => {
  const navigate = useNavigate(); // Utiliza useNavigate en lugar de useHistory
  const [arregloTickets, setArregloTickets] = useState([]);

  const listadoTickets = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/api/tickets`);
      console.log(response); // Verifica los datos recibidos
      setArregloTickets(response);
    } catch (error) {
      console.error("Error al obtener los tickets:", error);
    }
  };

  useEffect(() => {
    listadoTickets();
  }, []);

  const borrar = async (e, id) => {
    e.preventDefault();

    // Preguntar al usuario si realmente desea eliminar el ticket
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este ticket?"
    );

    if (!confirmacion) {
      return;
    }

    try {
      // Corregir la ruta para incluir el ID específico del ticket a eliminar
      const response = await APIInvoke.invokeDELETE(`/api/tickets/${id}`);

      if (response.ok === "SI") {
        mensajeConfirmacion("success", response.msg);

        // Actualizar la lista de tickets después de la eliminación exitosa
        listadoTickets();
      } else {
        mensajeConfirmacion("error", response.msg);
      }
    } catch (error) {
      console.error("Error al eliminar el ticket:", error);
      mensajeConfirmacion("error", "Error al eliminar el ticket");
    }
  };

  const verDetalles = (id) => {
    // Redirige a la página de detalles del ticket
    navigate(`/tickets-admin/${id}`);
  };

  const responderTicket = (id) => {
    // Redirige a la página de detalles del ticket para responder
    navigate(`/responder-ticket/${id}`);
  };

  return (
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
  );
};

export default TicketsAdmin;
