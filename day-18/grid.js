'use strict';

class Grid {
  constructor(stickyCorners) {
    this.width = 0;
    this.height = 0;
    this.cells = [];
    this.stickyCorners = stickyCorners || false;
  }

  parse(input) {
    var lines = input.split(/\n/);
    this.width = lines[0].length;
    this.height = lines.length;
    this.cells = lines.reduce((a, line) => a.concat(line.split('').map(x => x === '#' ? true : false)), []);
  }

  getCell(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return false;
    }

    return this.cells[y * this.width + x] || false;
  }

  getCoords(index) {
    return {
      x: index % this.width,
      y: Math.floor(index / this.width)
    };
  }

  getNeighbors(x, y) {
    return [
      this.getCell(x - 1, y - 1),
      this.getCell(x, y - 1),
      this.getCell(x + 1, y - 1),
      this.getCell(x - 1, y),
      this.getCell(x + 1, y),
      this.getCell(x - 1, y + 1),
      this.getCell(x, y + 1),
      this.getCell(x + 1, y + 1),
    ];
  }

  isCorner(x, y) {
    return (
      (x === 0 && y === 0) ||
      (x === this.width - 1 && y === 0) ||
      (x === 0 && y === this.height - 1) ||
      (x === this.width - 1 && y === this.height - 1)
    );
  }

  update() {
    this.cells = this.cells.map((cell, index) => {
      var on = 0, off = 0;
      var coords = this.getCoords(index);

      if (this.stickyCorners && this.isCorner(coords.x, coords.y)) {
        return true;
      }

      this.getNeighbors(coords.x, coords.y).forEach(neighbor => {
        if (neighbor) {
          on += 1;
        } else {
          off += 1;
        }
      });

      if (cell) {
        return on === 2 || on === 3;
      }

      return on === 3;
    });
  }
}

module.exports = Grid;
