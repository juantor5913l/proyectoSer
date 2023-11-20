import React from "react";
import Logo2 from "../assets/img/logo2.jpg";
import { Link, useNavigate } from "react-router-dom";
import mensajeConfirmacion from "../helpers/mensajes.js";

const SidebarContainer = () => {
  const navigate = useNavigate();
  const cerrarSesion = () => {
    localStorage.removeItem("iduser");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("rol");

    mensajeConfirmacion("success", "Sesión finalizada correctamente");

    navigate("/");
  };


  return (
    <div>
    <div className="min-height-300 bg-primary position-absolute w-100" />
    <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
      <div className="sidenav-header">
        <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
        <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/argon-dashboard/pages/dashboard.html " target="_blank">
        <img src={Logo2} alt="Logo" />
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
            <a className="nav-link "  onClick={cerrarSesion} >
              <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i className="ni ni-single-copy-04 text-warning text-sm opacity-10" />
              </div>
              <span className="nav-link-text ms-1">Cerrar sesión</span>
            </a>
          </li>
         
        </ul>
      </div>
      </aside>
      </div>
    
  );
};

export default SidebarContainer;
