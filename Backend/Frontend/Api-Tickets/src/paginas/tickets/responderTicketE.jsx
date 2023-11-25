import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import APIInvoke from '../../helpers/APIInvoke';
import '../auth/css/chatClient.css';

const ChatComponentE = () => {
  const clienteId = localStorage.getItem('iduser');
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  const socket = io('http://localhost:4000', {
    transports: ['websocket'],
    withCredentials: true,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const empleadoResponse = await APIInvoke.invokeGET(`/api/usuarios/${clienteId}`);
        setCurrentUser(empleadoResponse.nombresUsuario || 'Empleado');
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
  }, [socket, messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Enviar mensaje con el nombre del cliente
    const newMsg = { user: currentUser, body: newMessage, ticketId: id };
    setMessages((prevMessages) => [...prevMessages, newMsg]); // Agregar el mensaje enviado al estado
    socket.emit('chat message', newMsg);

    setNewMessage('');
  };

  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-md-6">
            <div className="card card-bordered">
              <div className="card-header">
                <h4 className="card-title"><strong>Chat</strong></h4>
              </div>

              <div className="ps-container ps-theme-default ps-active-y" id="chat-content" style={{ overflowY: 'scroll', height: '400px' }}>
                {/* Mostrar mensajes de chat */}
                {messages.map((message, index) => (
                  <div key={index} className={`media media-chat ${message.user === currentUser ? 'media-chat-reverse' : ''}`}>
                    <img className="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
                    <div className="media-body">
                      <p>
                        <strong>{message.user === currentUser ? 'Empleado' : 'Cliente'}:</strong> {message.body}
                      </p>
                      <p className="meta">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="ps-scrollbar-x-rail" style={{ left: '0px', bottom: '0px' }}>
                <div className="ps-scrollbar-x" tabIndex="0" style={{ left: '0px', width: '0px' }}></div>
              </div>
              <div className="ps-scrollbar-y-rail" style={{ top: '0px', height: '0px', right: '2px' }}>
                <div className="ps-scrollbar-y" tabIndex="0" style={{ top: '0px', height: '2px' }}></div>
              </div>
            </div>

            <div className="publisher bt-1 border-light">
              <img className="avatar avatar-xs" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="..." />
              <input
                className="publisher-input"
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write something"
              />
              <span className="publisher-btn file-group">
                <i className="fa fa-paperclip file-browser"></i>
                <input type="file" />
              </span>
              <a className="publisher-btn" href="#" data-abc="true">
                <i className="fa fa-smile"></i>
              </a>
              <button className="publisher-btn text-info" onClick={handleSendMessage} data-abc="true">
                Enviar<i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponentE;
