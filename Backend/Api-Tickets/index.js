import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';

import conectarDB from './config/db.js';
import rolesRoutes from './routes/rolesRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import categoriasRoutes from './routes/categoriasRoutes.js';
import ticketsRoutes from './routes/ticketsRoutes.js';
import respuestaTicketsRoutes from './routes/respuestaTicketsRoutes.js';
import imagenRespuestasRoutes from './routes/imagenRespuestasRoutes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Ajusta según sea necesario
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

dotenv.config();
app.use(express.json());
conectarDB();

// Configuración de CORS para Express
app.use(cors({
  origin: process.env.FRONTEND_URL, // Ajusta según sea necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Resto de tu código...

// Manejo de conexiones de socket
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Manejar mensajes de chat
  socket.on('chat message', (msg) => {
    // Emitir el mensaje al socket que lo envió
    socket.emit('chat message', msg);
    
    // Emitir el mensaje al resto de los sockets conectados
    socket.broadcast.emit('chat message', msg);
  });

  // Manejar desconexiones
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Rutas de Express
app.use("/api/roles", rolesRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/tickets/crear-tickets", ticketsRoutes);
app.use("/api/tickets/:id/responder", respuestaTicketsRoutes);
app.use("/api/imagenesrespuestas", imagenRespuestasRoutes);
app.use("/api/usuarios/:id", usuariosRoutes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
