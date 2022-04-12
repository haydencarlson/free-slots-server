const users = require('../db/collections/users');

async function handleUserConnect(socket, ip) {
  const Users = new users();
  const existingUser = await Users.findUser(ip);
  if (!existingUser) {
    await Users.registerUser(ip);
    socket.emit('balance', 0);
  } else {
    socket.emit('balance', existingUser.balance);
  }
}

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const ip = socket.conn.remoteAddress;
    console.log(`IP: ${ip} Socket ID: ${socket.id} connected.`);
    await handleUserConnect(socket, ip);

    socket.on('disconnect', () => {
      console.log(`IP: ${ip} Socket ID: ${socket.id} user disconnected.`);
    });
  });
}