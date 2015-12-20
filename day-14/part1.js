var ReindeerTimer = require('./reindeer');

module.exports = input => {
  var timer = new ReindeerTimer();
  input.split(/\n/).map(timer.parse);
  timer.run(2503);

  return timer.getLead()[0].distance;
};
