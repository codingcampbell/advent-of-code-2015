var ration = (length, callback) => {
  var arr = Array.apply(null, { length }).map(x => 1);
  var count = arr.reduce((a, b) => a + b, 0);
  var done = false;

  var bump = n => {
    if (n < 0) {
      done = true;
      return;
    }

    arr[n] += 1;
    count += 1;

    if (arr[n] === 100) {
      count -= 99;
      arr[n] = 1;
      bump(n - 1);
    }
  };

  while (!done) {
    bump(arr.length - 1);
    if (count === 100) {
      callback(arr);
    }
  }
};

module.exports.getMaxValue = (ingredients, exactCalories) => {
  var maxValue = 1;
  var components = Object.keys(ingredients[0]).filter(component => component !== 'calories');

  ration(ingredients.length, amount => {
    var j, n, componentValue = 0, value = 1;

    if (exactCalories) {
      for (n = 0; n < amount.length; n += 1) {
        componentValue += ingredients[n].calories * amount[n];
      }

      if (componentValue !== exactCalories) {
        return;
      }
    }

    for (j = 0; j < components.length; j += 1) {
      componentValue = 0;
      for (n = 0; n < amount.length; n += 1) {
        componentValue += ingredients[n][components[j]] * amount[n];
      }

      if (componentValue > 0) {
        value *= componentValue;
      } else {
        value = 0;
      }
    }

    maxValue = Math.max(maxValue, value);
  });

  return maxValue;
};

module.exports.parseIngredients = input =>
  input.split(/\n/).map(line => {
    var ingredient = {};
    line.match(/(\w+ -?\d+)/g).forEach(match => {
      var components = match.split(/ /);
      ingredient[components[0]] = +components[1];
    });

    return ingredient;
  })
