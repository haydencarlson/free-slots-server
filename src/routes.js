const { Router } = require('express');
const router = Router();
const service = require('./service');
const users = require('../db/collections/users');

module.exports = (io) => {
  const round = (num) => Number(num).toFixed(8);

  async function findSocketByIp(ip) {
    const sockets = await io.fetchSockets();
    return sockets.find(socket => socket.conn.remoteAddress === ip);
  }

  router.get('/spin', async (req, res) => {
    const ip = req.socket.remoteAddress;
    const userSocket = await findSocketByIp(ip);
    const randomSpin = service.generateRandomSpin();
    console.log(`Spinning: ${JSON.stringify(randomSpin)} For IP: ${ip}`);
    try {
      const winningSymbol = service.checkForWinningSymbol(randomSpin);
      if (winningSymbol) {
        const Users = new users();
        const pay = await service.getPayForSymbol(winningSymbol);
        const user = await Users.updateBalance(ip, pay);
        const newBalance = round(user.value.balance + pay);
        console.log(`Winning Symbol: ${winningSymbol} IP: ${ip} Pays: ${pay} Balance Now: ${newBalance}`);
        userSocket.emit('balance', newBalance);
      }
      res.json(randomSpin);
    } catch(e) {
      console.log(e);
      res.status(500);
    }
  });
  return router;
}

