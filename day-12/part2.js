sum = obj => {
  if (typeof obj === 'string') {
    return 0;
  }

  if (typeof obj === 'number') {
    return obj;
  }

  if (obj.constructor === Array) {
    return obj.reduce((a, b) => a + sum(b), 0);
  }

  var isValid = true;
  var value = Object.keys(obj).reduce((a, b) => {
    if (obj[b] === 'red') {
      isValid = false;
    }

    return !isValid ? 0 : a + sum(obj[b]);
  }, 0);

  return !isValid ? 0 : value;
};

module.exports = input => {
  return sum(JSON.parse(input));
};
