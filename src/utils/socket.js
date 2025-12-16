const { Server } = require('socket.io');

let IO;

exports.initIO = (server) => {
  IO = new Server(server, {
    cors: { origin: '*' },
  });

  IO.use((socket, next) => {
    if (socket.handshake.query) {
      const uid = socket.handshake.query.uid;
      socket.user = uid;
      next();
    }
  });

  IO.on('connection', (socket) => {
    socket.join(socket.user);
    console.log('User Connected:', socket.user);

    socket.on('disconnect', () => {
      console.log('User Disconnected:', socket.user);
      socket.leave(socket.user);
    });
  });
};

exports.getIO = () => {
  if (!IO) throw new Error('Socket not initialized');
  return IO;
};
