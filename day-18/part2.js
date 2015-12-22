'use strict';

var Grid = require('./grid');

module.exports = input => {
  var grid = new Grid(true);
  grid.parse(input);

  for (let j = 0; j < 100; j += 1) {
    grid.update();
  }

  return grid.cells.filter(x => x === true).length;
};
