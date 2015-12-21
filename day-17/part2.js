var Eggnog = require('./eggnog');

module.exports = input => {
  var count = 0;
  Eggnog.permute(Eggnog.minContainers, 150, r => { count += 1; });
  return count;
};
