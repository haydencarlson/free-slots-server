const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000;
const service = require('./service');
app.use(cors());

app.get('/api/v1/spin', (req, res) => {
  const randomSpin = service.generateRandomSpin();
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  console.log(`Spinning: ${JSON.stringify(randomSpin)} For IP: ${ip}`);
  try {
    const winningSymbol = service.checkForWinningSymbol(randomSpin);
    if (winningSymbol) {
      const pay = service.getPayForSymbol(winningSymbol);
      console.log(`Winning Symbol: ${winningSymbol} IP: ${ip} Pays ${pay}`);
    }
    res.json(randomSpin);
  } catch(e) {
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});