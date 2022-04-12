const symbols = [
  'strawberry',
  'apple',
  'orange',
  'grapes',
];

const payTable = {
  rstar: 0.05,
  star: 0.02,
  grapes: 0.015,
  banana: 0.01,
  apple: 0.01,
  strawberry: 0.008,
  pineapple: 0.005,
  orange: 0.005
};

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

// Returns the pay for the winning symbol
function getPayForSymbol(symbol) {
  return payTable[symbol];
}

module.exports = {
  generateRandomSpin,
  checkForWinningSymbol,
  getPayForSymbol
}