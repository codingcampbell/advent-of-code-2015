var Eggnog = require('./eggnog');

module.exports = input => {
  var count = 0;
  Eggnog.parse(input);
  Eggnog.permute(0, 150, r => { count += 1; });
  return count;
};
