var parser = require('./parser');

module.exports = input => {
  var total = { chars: 0, code: 0 }

  input.split(/\n/).map(parser).forEach(result => {
    total.code += result.count.code;
    total.chars += result.count.chars;
  });

  return total.code - total.chars;
};
