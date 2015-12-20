var fs = require('fs');

var cliDays = process.argv.slice(2).map(n => +n).filter(n => n && !isNaN(n));

var answers = {
  'day-1': { part1: 74, part2: 1795 },
  'day-2': { part1: 1606483, part2: 3842356 },
  'day-3': { part1: 2592, part2: 2360 },
  'day-4': { part1: 282749, part2: 9962624 },
  'day-5': { part1: 258, part2: 53 },
  'day-6': { part1: 377891, part2: 14110788 },
  'day-7': { part1: 956, part2: 40149 },
  'day-8': { part1: 1342, part2: 2074 },
  'day-9': { part1: 207, part2: 804 },
  'day-10': { part1: 329356, part2: 4666278 },
  'day-11': { part1: 'hxbxxyzz', part2: 'hxcaabcc' },
  'day-12': { part1: 156366, part2: 96852 },
  'day-13': { part1: 618, part2: 601 },
  'day-14': { part1: 2655, part2: 1059 },
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
