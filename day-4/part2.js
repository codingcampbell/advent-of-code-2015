var crypto = require('crypto');
module.exports = input => {
  var j = 0;

  while (true) {
    if (/^000000/.test(crypto.createHash('md5').update(input + String(j)).digest('hex'))) {
      break;
    }
    j += 1;
  }

  return j;
};
