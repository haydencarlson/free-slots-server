const axios = require('axios');

const symbols = [
  'strawberry',
  'apple',
  'orange',
  'grapes'
];

const payTable = {
  grapes: 0.001,
  apple: 0.001,
  strawberry: 0.001,
  orange: 0.001
};

async function getLitecoinPrice() {
  const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd')
  return data['litecoin']['usd'];
}

function generateRandomSpin() {
  return Array.from({ length: 5 }, () => Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]));
}

function checkForWinningSymbol(spin) {
  // Protects against null/falsey symbols in case of a bug
  spin.forEach((reel) => {
    const isAnyMissing = reel.some(symbol => !symbol);
    if (isAnyMissing) throw new Error(`Reel contains null symbol`);
  })
  
  // Converts reels to each row array to check for a winner in a row
  const rowsResult = spin.reduce((rowsResult, reel) => {
    reel.forEach((symbol, i) => {
      rowsResult[i].push(symbol);
    });
    return rowsResult;
  }, {0: [], 1: [], 2: []});

  const rows = Object.values(rowsResult);

  // Checks for a winner in each row
  // Doesnt currently handle multiple winning rows
  let winningSymbol = false;
  rows.forEach((row) => {
    if (row.every((symbol) => symbol === row[0])) {
      winningSymbol = row[0];
    }
  });
  return winningSymbol;
};

// Returns the pay for the winning symbol in LTC
async function getPayForSymbol(symbol) {
  const ltcPrice = await getLitecoinPrice();
  if (!ltcPrice || ltcPrice <= 0) throw new Error(`Litecoin price is 0`);
  return payTable[symbol] / ltcPrice;
}

(async() => {
  console.log('Running test pay per day...');
  const ltcPrice = await getLitecoinPrice();
  let totalWins = 0;
  let totalPay = 0;
  for (let i = 1; i < 34560; i++) {
    const spin = generateRandomSpin();
    const winningSymbol = checkForWinningSymbol(spin);
    if (winningSymbol) {
      const pay = payTable[winningSymbol] / ltcPrice;
      totalPay += pay;
      totalWins++;
    }
  }
  console.log(`Total Pay: ${totalPay} Total Wins: ${totalWins}`);
})();

module.exports = {
  generateRandomSpin,
  checkForWinningSymbol,
  getPayForSymbol,
  getLitecoinPrice
}