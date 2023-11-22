import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import APIInvoke from '../../helpers/APIInvoke';

const ChatComponent = () => {
  const clienteId = localStorage.getItem('iduser');
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const socket = io('http://localhost:4000', {
    transports: ['websocket'],
    withCredentials: true,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Realiza una solicitud para obtener la información del cliente por ID
        const clienteResponse = await APIInvoke.invokeGET(`/api/usuarios/${clienteId}`);
        setCurrentUser(clienteResponse.nombresUsuario || 'Cliente');

        // Realiza una solicitud para obtener la información del empleado por ID
        const empleadoResponse = await APIInvoke.invokeGET(`/api/usuarios/${id}`);
        setOtherUser(empleadoResponse.nombresUsuario || 'Empleado');
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUserData();
  }, [clienteId, id]);

  useEffect(() => {
    // Escuchar mensajes de chat
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Enviar mensaje con el nombre del cliente
    socket.emit('chat message', { user: currentUser, body: newMessage, ticketId: id });

    setNewMessage('');
  };

  return (
    <div>
      <div>
        <h2>Chat entre {currentUser} y {otherUser}</h2>
      </div>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {/* Mostrar mensajes de chat */}
        {messages.map((message, index) => (
          <div key={index}>
             <strong>{message.user === currentUser ? 'Cliente' : 'Empleado'}:</strong>{' '}
            {message.body}
          </div>
        ))}
      </div>
      <div>
        {/* Campo de entrada para nuevos mensajes */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;
