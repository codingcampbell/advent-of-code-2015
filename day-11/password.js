'use strict';

var uniq = function(arr) {
  var cache = {}, result = [];
  arr.forEach(value => {
    if (!cache[value]) {
      result.push(value);
      cache[value] = true;
    }
  });

  return result;
};

var hasAscension = input => {
  var chars = input.split(''), count = 0, lastCode = 0, code;

  while (chars.length) {
    code = chars.shift().charCodeAt(0);
    count = (code === lastCode + 1) ? count + 1 : 1;
    lastCode = code;

    if (count === 3) {
      return true;
    }
  }

  return false;
};

var getNext = password => {
  var result = [], tmp = password.split('').map(x => x.charCodeAt(0));

  while (tmp.length) {
    result.unshift(tmp.pop() + 1);

    if (result[0] <= 122) { // 122 = 'z'
      break;
    }

    result[0] = 97; // 97 = 'a'
  }

  return tmp.concat(result).map(x => String.fromCharCode(x)).join('');
};

class Password {
  constructor(password) {
    this.password = password;
  }

  isValid() {
    // May not contain i, o, or l.
    if (/[iol]/.test(this.password)) {
      return false;
    }

    // Must contain at least 2 different pairs of letters
    if (uniq(this.password.match(/([a-z])\1/g) || []).length < 2) {
      return false;
    }

    // Must contain 3 ascending characters, e.g. abc, def, etc.
    if (!hasAscension(this.password)) {
      return false;
    }

    return true;
  }

  bump() {
    do {
      this.password = getNext(this.password);
    } while(!this.isValid());

    return this;
  }
}

module.exports = Password;
