var seesay = require('./seesay');

module.exports = input => {
  var j, result = '' + input;

  for (j = 0; j < 50; j += 1) {
    result = seesay(result);
  }

  return result.length;
};
