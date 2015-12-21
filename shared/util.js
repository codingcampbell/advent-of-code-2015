'use strict';

// Adapted from https://en.wikipedia.org/wiki/Heap's_algorithm
var permutateStream = (arr, callback) => {
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

  heap(arr.length, arr, callback);
};

module.exports.permutate = arr => {
  var results = [];
  permutateStream(arr, result => results.push(result));
  return results;
};

module.exports.permutateStream = permutateStream;

module.exports.uniq = function(arr) {
  var cache = {}, result = [];
  arr.forEach(value => {
    var key = value.join('+');
    if (!cache[key]) {
      result.push(value);
      cache[key] = true;
    }
  });

  return result;
};
