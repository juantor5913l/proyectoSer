import React from "react";
import ContentHeader from "../componentes/contentHeader.jsx";
import mensajeConfirmacion from "../helpers/mensajes.js";
import { Link , useNavigate } from "react-router-dom";
import '../assets/css/nucleo-svg.css'
import '../assets/css/nucleo-icons.css'
import '../assets/css/argon-dashboard.css'
import '../assets/css/argon-dashboard.css.map'
import '../assets/css/argon-dashboard.min.css'
import LogoPrueba from '../assets/img/logo2.jpg';

const DashBoard = () => {
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
    <main id="main" className="main">
        <ContentHeader
          titulo={"DashBoard"}
          breadCrumb1={"DashBoard"}
          breadCrumb2={""}
          breadCrumb3={""}
          ruta={"/menu-principal"}
        />
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
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">Roles</p>
                          <span className="text-muted small pt-2 ps-1">
                            <Link to={"/roles-admin"}>Listado Roles</Link>
                          </span>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                    <i className="ni ni-money-coins text-lg opacity-10" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">Tickets</p>
                          <span className="text-muted small pt-2 ps-1">
                            <Link to={"/tickets-admin"}>Listado de tickets</Link>
                          </span>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                    <i className="ni ni-world text-lg opacity-10" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                  <p className="text-sm mb-0 text-uppercase font-weight-bold">Categorias</p>
                          <span className="text-muted small pt-2 ps-1">
                            <Link to={"/categorias-admin"}>Listado de categorias </Link>
                          </span>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                    <i className="ni ni-paper-diploma text-lg opacity-10" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">Registrar empleados</p>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder"></span> 
                      <Link to={"/crear-empleado"}>Registra aqui</Link>
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                    <i className="ni ni-cart text-lg opacity-10" aria-hidden="true" />
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
       
      </main>
        
      

  );
};

export default DashBoard;
