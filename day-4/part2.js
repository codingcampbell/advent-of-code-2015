var child_process = require('child_process');
var numCPUs = require('os').cpus().length;

module.exports = (input, callback) => {
  var pattern = '^000000';
  var count = 0;
  var start = 0;
  var range = 500000;
  var found = false;

  (function loop() {
    if (found || count >= numCPUs) {
      return;
    }

    var p = child_process.fork(__dirname + '/md5');

    p.on('exit', function() {
      count -= 1;
      return process.nextTick(loop);
    });

    p.on('message', function(m) {
      if (!found) {
        found = true;
        callback(m);
      }
    });

    p.send({ input, pattern, start, end: start + range });
    start += range;
    count += 1;

    process.nextTick(loop);
  }());
};
