import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIInvoke from "../../helpers/APIInvoke";
import Navbar from "../../componentes/navbar.jsx";
import SidebarContainer from "../../componentes/sidebarContainer.jsx";
import ContentHeader from "../../componentes/contentHeader.jsx";

const BandejaEntrada = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    obtenerTickets();
  }, []);

  const obtenerTickets = async () => {
    try {
      // Se asume que la respuesta de la API contiene un array de tickets
      const response = await APIInvoke.invokeGET("/api/tickets");
      setTickets(response);
    } catch (error) {
      console.error("Error al obtener tickets:", error);
    }
  };

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
      <div>
        <h2>Bandeja de Entrada</h2>
        {tickets.length === 0 ? (
          <p>No hay tickets disponibles</p>
        ) : (
          <ul>
            {tickets.map((ticket) => (
              <li key={ticket._id}>
                {/* Se asume que cada ticket tiene un campo "asunto" y "_id" */}
                <Link to={`/tickets/${ticket._id}`}>{ticket.asunto}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default BandejaEntrada;
