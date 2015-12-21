'use strict';
var util = require('../shared/util');

class Eggnog {
  constructor() {
    this.minContainers = Infinity;
    this.containers = [];
  }

  parse(input) {
    this.containers = input.split(/\n/).map(x => +x);
  }

  permute(minContainers, targetValue, callback) {
    var arr = this.containers;
    var cache = {};
    var p = (indices, start, end, callback) => {
      var sub = indices.slice(0, start);
      var sum = sub.reduce((a, b) => a + arr[b], 0);

      if (sum === targetValue) {
        this.minContainers = Math.min(this.minContainers, sub.length);
        return callback(sub);
      }

      if (minContainers && sub.length >= minContainers) {
        return;
      }

      for (let j = start; j < end; j += 1) {
        if (sum + arr[indices[j]] > targetValue) {
          continue;
        }

        p(util.swap(indices.slice(), start, j, callback), start + 1, end, callback);
      }
    }

    var indices = Object.keys(arr);

    p(indices, 0, arr.length, r => {
      var key = r.sort().join('+');
      if (!cache[key]) {
        cache[key] = 1;
        //callback(r.map(v => arr[v]));
        callback();
      }
    });
  }
}

module.exports = new Eggnog();
