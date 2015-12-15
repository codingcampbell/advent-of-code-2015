var sum = input => {
  return (input.match(/-?\d+/g) || []).reduce((a, b) => a + parseInt(b), 0);
}

module.exports = input => {
  return sum(input);
}
