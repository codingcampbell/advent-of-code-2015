'use strict';

var util = require('../shared/util');

class Graph {
  constructor() {
    this.nodes = {};
  }

  add(from, to, distance) {
    this.nodes[from] = this.nodes[from] || { relations: {} };
    this.nodes[from].relations[from] = 0;
    this.nodes[from].relations[to.trim()] = +distance;
  }

  parse(line) {
    var components = line.match(/(\w+) would (lose|gain) (\d+).+\s+(\w+)\.$/i);
    if (!components) {
      throw new Error('Cannot parse: ' + line);
    }

    var points = +components[3];
    if (components[2] === 'lose') {
      points = -points;
    } else if (components[2] !== 'gain') {
      points = 0;
    }

    this.add(components[1], components[4], points);
  }

  getDistance(path) {
    var distance = 0, p = path.slice().concat(path[0]);
    var current = p.shift();

    while (p.length) {
      distance += this.nodes[current].relations[p[0]];
      distance += this.nodes[p[0]].relations[current];
      current = p.shift();
    }

    return distance;
  }

  getRoutes() {
    return util.permutate(Object.keys(this.nodes)).map(path => ({
      path,
      distance: this.getDistance(path)
    }));
  }
};

module.exports = Graph;
