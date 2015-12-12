var turn = val => n => Math.max(0, n + val);

var parse = line => {
  var numbers = line.match(/\d+,\d+/g);
  var fn = /^toggle/.test(line) ? turn(2) : (/^turn on/.test(line) ? turn(1) : turn(-1));

  return numbers.map(n => n.split(/,/)).reduce((a, b) => a.concat(b), [fn]);
};

var transform = (grid, fn, x1, y1, x2, y2) => {
  var x, y;
  for (y = +y1; y <= +y2; y += 1) {
    for (x = +x1; x <= +x2; x += 1) {
      grid[y][x] = fn(grid[y][x]);
    }
  }
};

var createArray = length => {
  var j, arr = [];
  for (j = 0; j < length; j += 1) {
    arr[j] = 0;
  }

  return arr;
};

var createGrid = (width, height) => {
  return createArray(width).map(() => createArray(height));
};

module.exports = input => {
  var grid = createGrid(1000, 1000);
  input.split(/\n/).map(parse).forEach(args => transform.apply(this, [grid].concat(args)));
  return grid.reduce((a, b) => a + b.reduce((a, b) => a + b, 0), 0);
};
