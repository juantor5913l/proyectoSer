import React, { useState, useEffect, Fragment } from "react";
import ContentHeader from "../../componentes/contentHeader.jsx";
import Navbar from "../../componentes/navbar.jsx";
import SidebarContainer from "../../componentes/sidebarContainer.jsx";
import APIInvoke from "../../helpers/APIInvoke.js";
import {  useParams } from "react-router-dom";

const DetallesTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState("");

  useEffect(() => {
    const obtenerTicket = async () => {
      try {
        const response = await APIInvoke.invokeGET(`/api/tickets/${id}`);
        console.log(response); // Verifica los datos recibidos
        setTicket(response);
      } catch (error) {
        console.error("Error al obtener el ticket:", error);
      }
    };

    obtenerTicket();
  }, [id]);

  const responderTicket = async () => {
    try {
      const response = await APIInvoke.invokePOST(`/api/tickets/${id}/responder`, {
        mensaje: nuevoMensaje,
      });

      if (response.ok === "SI") {
        // Actualizar la lista de mensajes después de la respuesta exitosa
        setTicket((ticketActual) => ({
          ...ticketActual,
          mensajes: [
            ...ticketActual.mensajes,
            { autor: "Empleado", contenido: nuevoMensaje },
          ],
        }));

        // Limpiar el campo de nuevo mensaje después de responder
        setNuevoMensaje("");
      } else {
        console.error("Error al responder al ticket:", response.msg);
      }
    } catch (error) {
      console.error("Error al responder al ticket:", error);
    }
  };

  if (!ticket) {
    return <p>Cargando...</p>;
  }

  return (
    <main id="main" className="main">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <ContentHeader
        titulo={`Detalles del Ticket #${id}`}
        breadCrumb1={"Tickets"}
        breadCrumb2={"Detalles del Ticket"}
        breadCrumb3={""}
        ruta={`/tickets-admin/${id}`}
      />
      {/* Main content */}
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            {ticket ? (
              <Fragment>
                {/* Aquí puedes mostrar los detalles del ticket y la sección para responder */}
                <h2>{ticket.asunto}</h2>
                <ul>
                  {ticket.mensajes.map((mensaje, index) => (
                    <li key={index}>
                      <strong>{mensaje.autor}:</strong> {mensaje.contenido}
                    </li>
                  ))}
                </ul>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    responderTicket();
                  }}
                >
                  <textarea
                    name="mensaje"
                    rows="4"
                    cols="50"
                    placeholder="Escribe tu respuesta..."
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    required
                  />
                  <button type="submit">Responder</button>
                </form>
              </Fragment>
            ) : (
              <p>Cargando...</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetallesTicket;
