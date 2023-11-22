import React, { useState, useEffect } from "react";
import APIInvoke from "../../helpers/APIInvoke.js";
import { Link, useNavigate } from "react-router-dom";
import mensajeConfirmacion from "../../helpers/mensajes.js";
import Logo2 from "../../assets/img/logo2.jpg";

const TicketsCliente = () => {
  const navigate = useNavigate();
  const cerrarSesion = () => {
    localStorage.removeItem("iduser");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("rol");

    mensajeConfirmacion("success", "Sesión finalizada correctamente");

    navigate("/");
  };
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
    navigate(`/chat/${id}`);
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
      <div>
  <div className="min-height-300 bg-primary position-absolute w-100" />
  <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
      <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
      <img src={Logo2}  className="navbar-brand-img h-100" alt="main_logo" />
        <span className="ms-1 font-weight-bold">Argon Dashboard 2</span>
      </a>
    </div>
    <hr className="horizontal dark mt-0" />
    <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" href="./pages/dashboard.html">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-tv-2 text-primary text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Dashboard</span>
          </a>
        </li>
       
        
       
        <li className="nav-item mt-3">
          <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">Account pages</h6>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="./pages/profile.html">
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-single-02 text-dark text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1">Profile</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link " onClick={cerrarSesion}>
            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
              <i className="ni ni-single-copy-04 text-warning text-sm opacity-10" />
            </div>
            <span className="nav-link-text ms-1" onClick={cerrarSesion} >Cerrar sesión</span>
          </a>
        </li>

      </ul>
    </div>
  </aside>
  <main className="main-content position-relative border-radius-lg ">
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">Tickets</p>
                          <span className="text-muted small pt-2 ps-1">
                            <Link to={"/tickets-cliente/${clienteId}`"}>Listado de tickets</Link>
                          </span>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                  <i class="bi bi-ticket-perforated-fill"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="row mt-4">

      </div>
    </div>
  </main>
  <div className="fixed-plugin">
    <Link className="fixed-plugin-button text-dark position-fixed px-3 py-2">
      <i className="fa fa-cog py-2"> </i>
    </Link>
   
        
        
        
         </div>
         </div>
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