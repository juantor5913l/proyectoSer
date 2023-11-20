// DetallesTicket.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import APIInvoke from "../../helpers/APIInvoke";

const DetallesTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    obtenerDetallesTicket();
  }, [id]);

  const obtenerDetallesTicket = async () => {
    try {
      const response = await APIInvoke.invokeGET(`/api/tickets/${id}`);
      setTicket(response);
    } catch (error) {
      console.error("Error al obtener detalles del ticket:", error);
    }
  };

  return (
    <div>
      <h2>Detalles del Ticket</h2>
      <p>Asunto: {ticket.asunto}</p>
      <p>Descripción: {ticket.descripcion}</p>
      {/* Aquí podrías incluir el chat y otras detalles del ticket */}
    </div>
  );
};

export default DetallesTicket;
