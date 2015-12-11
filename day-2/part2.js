var getRibbonFeet = (w, h, l) => {
  var ribbonLength = [w ,h, l].sort((a, b) => +b - +a).slice(1).reduce((a, b) => a + b * 2, 0);
  var bowLength = [w, h, l].reduce((a, b) => a * b, 1);

  return ribbonLength + bowLength;
};

module.exports = input => {
  return input.split(/\n/).reduce((a, line) => {
    var numbers = line.split(/x/);
    return numbers.length !== 3 ? a : a + getRibbonFeet.apply(this, numbers);
  }, 0);
};
