import React, { useState, useEffect } from "react";
import APIInvoke from "../../helpers/APIInvoke.js";
import { useNavigate, Link } from "react-router-dom";
import mensajeConfirmacion from "../../helpers/mensajes.js";
import Form from "react-bootstrap/Form";
import dominios from "../../helpers/dominios.js";
import LogoPrueba from '../../assets/img/logo2.jpg';

const TicketsCrearC = () => {
    const navigate = useNavigate();
    const cerrarSesion = () => {
        localStorage.removeItem("iduser");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("rol");
    
        mensajeConfirmacion("success", "Sesión finalizada correctamente");
    
        navigate("/");
      };
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
  const clienteId = localStorage.getItem("iduser")

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
        navigate("/tickets-cliente/${clienteId}`");
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
      <div>
  <div className="min-height-300 bg-primary position-absolute w-100" />
  <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
    <div className="sidenav-header">
      <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
      <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
      <img src={LogoPrueba}  className="navbar-brand-img h-100" alt="main_logo" />
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
                          <Link to={`/tickets-cliente/${clienteId}`}>Listado de tickets</Link>
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

export default TicketsCrearC;
