import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Listening on: ${PORT}`));

// socket.io handlers
io.on('connect', socket => {
  let addedUser = false;

  socket.on('new message', ({ msg }) => {
    io.emit('new message', { msg, username: socket.username });
  });

  socket.on('add user', username => {
    if (addedUser) return;

    socket.username = username;
    addedUser = true;
    io.emit('user joined', {
      username: socket.username,
    });
  });
});