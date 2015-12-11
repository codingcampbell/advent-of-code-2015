module.exports = (input) => {
  var count = 0, result;

  input.split('').every((y, index) => {
    result = index + 1;
    count += (y === '(' ? 1 : -1);

    return count >= 0;
  });

  return result;
};
