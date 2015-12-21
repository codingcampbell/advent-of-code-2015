var recipe = require('./recipe');

module.exports = input => {
  return recipe.getMaxValue(recipe.parseIngredients(input), 500);
};
