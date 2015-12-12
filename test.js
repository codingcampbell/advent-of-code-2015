var fs = require('fs');

var cliDays = process.argv.slice(2).map(n => +n).filter(n => n && !isNaN(n));

var answers = {
  'day-1': {
    part1: 74,
    part2: 1795
  },
  'day-2': {
    part1: 1606483,
    part2: 3842356
  },
  'day-3': {
    part1: 2592,
    part2: 2360
  },
  'day-4': {
    part1: 282749,
    part2: 9962624
  },
  'day-5': {
    part1: 258,
    part2: 53
  },
  'day-6': {
    part1: 377891,
    part2: 14110788
  },
};

var assert = (left, right, done) => done(left === right ? null : new Error(right + ' instead of ' + left))
var asyncify = val => val.length > 1 ? val : (input, done) => process.nextTick(() => done(val(input)));

Object.keys(answers).forEach((day, index) => {
  if (cliDays.length && cliDays.indexOf(index + 1) === -1) {
    return;
  }

  describe(day, () => {
    Object.keys(answers[day]).forEach(part => {
      var mod = require('./' + day + '/' + part);

      it(part + ' should be ' + answers[day][part], function(done) {
        this.timeout(0);
        fs.readFile('./' + day + '/input.txt', (err, data) =>
          err && done(err) || asyncify(mod)(data.toString(), value => assert(answers[day][part], value, done))
        )
      });
    });
  });
});
