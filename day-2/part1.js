var getSqFeet = (w, h, l) => {
  var sqft = (2 * l * w) + (2 * w * h) + (2 * h * l);
  var slack = [w ,h, l].sort((a, b) => +b - +a).slice(1).reduce((a, b) => a * b, 1);

  return sqft + slack;
};

module.exports = input => {
  return input.split(/\n/).reduce((a, line) => {
    var numbers = line.split(/x/);
    return numbers.length !== 3 ? a : a + getSqFeet.apply(this, numbers);
  }, 0);
};
