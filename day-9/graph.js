'use strict';

/* There is plenty of room for improvement here. Searching the graph for routes takes a long time.
* This could be improved with caching or using a better algorithm (e.g. Dijkstra's)
*/

// Adapted from https://en.wikipedia.org/wiki/Heap's_algorithm
var permutate = arr => {
  var swap = (arr, leftIndex, rightIndex) => {
    var tmp = arr[leftIndex];
    arr[leftIndex] = arr[rightIndex];
    arr[rightIndex] = tmp;
  };

  var heap = function(n, arr, callback) {
    if (n === 1) {
      return callback(arr);
    }

    for (let j = 0; j < n - 1; j += 1) {
      heap(n - 1, arr, callback);
      swap(arr, n % 2 === 0 ? j : 0, n - 1);
    }

    heap(n - 1, arr, callback);
  };

  var results = [];
  heap(arr.length, arr, result => results.push(result.slice()));

  return results;
};

var uniq = function(sortedArr) {
  var result = [], lastKey = null, hash = value => value.join('+');

  sortedArr.forEach(value => {
    var key = hash(value);
    if (lastKey !== key) {
      result.push(value);
    }
    lastKey = key;
  });

  return result;
};

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
    return uniq(Object.keys(this.nodes).reduce((a, b) => {
      return a.concat(permutate(Object.keys(this.nodes[b].relations)));
    }, []).sort()).map(path => ({
      path,
      distance: this.getDistance(path)
    }));
  }
};

module.exports = Graph;
