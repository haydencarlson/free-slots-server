const assert = require('assert');
const { checkForWinningSymbol } = require('../service');

describe('checkForWinningSymbol', () => {

  it('should return false if no winning symbol', () => {
    const spin = [
      ['banana', 'apple', 'orange'],
      ['grapes', 'strawberry', 'star'],
      ['rstar', 'pineapple', 'pineapple'],
      ['rstar', 'strawberry', 'orange'],
      ['rstar', 'pineapple', 'star']
    ];
    const result = checkForWinningSymbol(spin);
    assert.equal(result, false);
  });

  it('should return the winning symbol', () => {
    const spin = [
      ['banana', 'pineapple', 'banana'],
      ['grapes', 'pineapple', 'star'],
      ['rstar', 'pineapple', 'star'],
      ['rstar', 'pineapple', 'star'],
      ['rstar', 'pineapple', 'star']
    ];
    const result = checkForWinningSymbol(spin);
    assert.equal(result, 'pineapple');
  });

  it('should error if any symbols are null', () => {
    const spin = [
      ['banana', 'pineapple', 'banana'],
      ['grapes', 'pineapple', 'star'],
      ['rstar', null, 'star'],
      ['rstar', 'pineapple', 'star'],
      ['rstar', 'pineapple', 'star']
    ];
    try {
      const result = checkForWinningSymbol(spin);
    } catch(e) {
      assert.equal(e.message, 'Reel contains null symbol');
    }
  });
});