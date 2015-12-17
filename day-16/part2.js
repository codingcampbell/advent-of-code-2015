var parser = require('./parser');

module.exports = input => {
  var query = {
    children: x => x === 3,
    cats: x => x > 7,
    samoyeds: x => x === 2,
    pomeranians: x => x < 3,
    akitas: x => x === 0,
    vizslas: x => x === 0,
    goldfish: x => x < 5,
    trees: x => x > 3,
    cars: x => x === 2,
    perfumes: x => x === 1
  };

  var result = { number: -1 };
  var max = 0;

  parser(input).forEach(sue => {
    var count = Object.keys(query).filter(key => query[key](sue[key])).length;
    if (count > max) {
      result = sue;
      max = count;
    }
  });

  return result.number;
};
