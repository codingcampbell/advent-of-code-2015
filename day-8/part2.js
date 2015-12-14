var parser = require('./parser');

var getTotal = results => {
  var total = { chars: 0, code: 0 }
  results.forEach(result => {
    total.code += result.count.code;
    total.chars += result.count.chars;
  });

  return total;
}

module.exports = input => {
  var lines = input.split(/\n/).map(parser);
  var firstTotal = getTotal(lines).code;
  lines = lines.map(line => parser(line.encoded));

  return getTotal(lines).code - firstTotal;
};
