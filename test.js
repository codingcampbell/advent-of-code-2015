var fs = require('fs');

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
};

var assert = (left, right, done) => done(left === right ? null : new Error(right + ' instead of ' + left))

Object.keys(answers).forEach(day => {
  describe(day, () => {
    Object.keys(answers[day]).forEach(part => {
      var mod = require('./' + day + '/' + part);

      it(part + ' should be ' + answers[day][part], function(done) {
        this.timeout(0);
        fs.readFile('./' + day + '/input.txt', (err, data) =>
          err && done(err) || assert(answers[day][part], mod(data.toString()), done)
        )
      });
    });
  });
});
