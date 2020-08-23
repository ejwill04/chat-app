import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);

// socket.io handlers
io.on('connect', socket => {
  const { id } = socket.client;
  console.log(`user: ${id}`);

  socket.on('message', msg => {
    console.log(`${id}: ${msg}`);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Listening on: ${PORT}`));