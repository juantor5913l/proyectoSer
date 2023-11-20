import React from "react";
import mensajeConfirmacion from "../helpers/mensajes";
import { useNavigate } from "react-router-dom";
import '../assets/css/bootstrap.min.css'
import '../assets/css/style.css'

const DashBoardC = () => {
    const navigate = useNavigate();
    const cerrarSesion = () => {
        localStorage.removeItem("iduser");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("rol");
    
        mensajeConfirmacion("success", "Sesión finalizada correctamente");
    
        navigate("/");
      };
      const handleButtonClick = (buttonName) => {
        // Lógica a ejecutar cuando se hace clic en un botón
        console.log(`Hiciste clic en el botón de ${buttonName}`);

        // Ejemplo de redirección a otra página
        // Puedes ajustar la ruta y la lógica según tus necesidades
        if (buttonName === "listar-ticketsC") {
            navigate("/tickets-cliente/${clienteId}`");
        } else if (buttonName === "crear-ticketC") {
            navigate("/tickets-crearC");
        }
        // Puedes agregar más condiciones según los botones que tengas
    };


      const nombreUsuario = localStorage.getItem("username");
  return (
      <div>
  {/* Navbar Start */}
  <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
    <a href="index.html" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
      <h2 className="m-0 text-primary"><i className="fa fa-book me-3" />Serviplus</h2>
    </a>
    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <div className="navbar-nav ms-auto p-4 p-lg-0">
        <a href="/menu-cliente" className="nav-item nav-link active">Home</a>
        <a onClick={cerrarSesion} className="nav-item nav-link">Cerrar sesión</a>
        
        
        
      </div>
    </div>
  </nav>
  <br /><br /><br />
  {/* Navbar End */}
            {/* Mensaje de bienvenida */}
            <div className="container text-center py-3">
                <h1 className="display-4">¡Hola {nombreUsuario} bienvenido a Serviplus!</h1>
                <p className="lead">Tu plataforma de creación de tickets en línea.</p>
            </div>
  
  {/* Service Start */}
  <div className="container-xxl py-5">
    <div className="container">
        <div className="row g-4">
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
            <button className="service-item text-center pt-3" onClick={() => handleButtonClick("crear-ticketC")}>
                    <div className="p-4">
                        <i className="fa fa-3x fa-graduation-cap text-primary mb-4" />
                        <h5 className="mb-3">Crear Ticket</h5>
                        <p>Aqui podras crear un ticket para que alguno de nuestros asesores lo respondan </p>
                    </div>
                </button>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
            <button className="service-item text-center pt-3" onClick={() => handleButtonClick("listar-ticketsC")}>
                    <div className="p-4">
                        <i className="fa fa-3x fa-book-open text-primary mb-4" />
                        <h5 className="mb-3">Ver mis Tickets</h5>
                        <p>Aqui podras ver los tickets creados y las respuestas de nuestros asesores </p>
                    </div>
                </button>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                
            </div>
        </div>
    </div>
</div>
<br /><br /><br />

  {/* Service End */}
 {/* Footer Start */}
 <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
  <div className="container py-5 text-center"> 
    <div className="row g-5">
      <div className="col-12">
        <p>&copy; Derechos reservados a Serviplus Sebastian Torres</p>
      </div>
    </div>
    <div className="container">
      <p>2023</p>
    </div>
  </div>
</div>
{/* Footer End */}
</div>

      


  );
};

export default DashBoardC;
