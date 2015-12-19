'use strict';

var util = require('../shared/util');

/* There is plenty of room for improvement here. Searching the graph for routes takes a long time.
* This could be improved with caching or using a better algorithm (e.g. Dijkstra's)
*/

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
    var components = line.split(/ to|= /).map(x => x.trim());
    this.add(components[0], components[1], components[2]);
    this.add(components[1], components[0], components[2]);
  }

  getDistance(path) {
    var distance = 0, p = path.slice(), current = p.shift();

    while (p.length) {
      distance += this.nodes[current].relations[p[0]];
      current = p.shift();
    }

    return distance;
  }

  getRoutes() {
    return util.uniq(Object.keys(this.nodes).reduce((a, b) => {
      return a.concat(util.permutate(Object.keys(this.nodes[b].relations)));
    }, [])).map(path => ({
      path,
      distance: this.getDistance(path)
    }));
  }
};

module.exports = Graph;
