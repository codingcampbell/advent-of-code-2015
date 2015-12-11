var crypto = require('crypto');

process.on('message', function(options) {
  var j, input = options.input, end = options.end, pattern = new RegExp(options.pattern);
  for (j = options.start; j <= end; j += 1) {
    if (pattern.test(crypto.createHash('md5').update(input + String(j)).digest('hex'))) {
      process.send(j);
      break;
    }
  }

  process.exit();
});
