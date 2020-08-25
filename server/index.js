import express from 'express';
import http from 'http';
import socketio from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketio(server);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Listening on: ${PORT}`));

// socket.io handlers
io.on('connect', (socket) => {
  // Handles incoming new messages and emits new message handler to all users
  socket.on('new message', ({ msg }) => {
    io.emit('new message', { msg, username: socket.username });
  });

  // Handles add user events and emits user joined events
  socket.on('add user', (username, cb) => {
    // TODO - We should check for username uniqueness and possibily consider persistences
    // NOTE - When a user joins, we do not send that user any existing message history.
    // This would be a nice improvement if we added persistence.
    socket.username = username;
    io.emit('user joined', {
      msg: `${socket.username} joined`,
    });

    cb();
  });

  socket.on('this user joined', (undefined, cb) => {
    cb(socket.username);
  });

  // Triggered when a user begins typing
  socket.on('typing', (isTyping) => {
    socket.broadcast.emit(
      'typing',
      isTyping ? `${socket.username} is typing` : ''
    );
  });

  // Triggered when a user disconnects
  socket.on('disconnect', () => {
    io.emit('user disconnect', {
      msg: `${socket.username} left`,
    });
  });
});
