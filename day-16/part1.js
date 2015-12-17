var parser = require('./parser');

module.exports = input => {
  var query = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
  };

  var result = { number: -1 };
  var max = 0;

  parser(input).forEach(sue => {
    var count = Object.keys(query).filter(key => query[key] === sue[key]).length;
    if (count > max) {
      result = sue;
      max = count;
    }
  });

  return result.number;
};
