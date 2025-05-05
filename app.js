const express = require('express');
const path = require('path');
const app = express();

// 👇 Creamos servidor HTTP a partir de la app
const http = require('http').createServer(app);

// 👇 Inicializamos Socket.io con ese servidor HTTP
const { Server } = require('socket.io');
const io = new Server(http);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;

let messages = [];

// Configuración de socket.io
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    socket.emit('messageList', messages);

    socket.on('newMessage', (message) => {
        const msg = { socketId: socket.id, message };
        messages.push(msg);
        io.emit('newMessage', msg);
    });
});

// 👇 Usamos http.listen en lugar de app.listen
http.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
