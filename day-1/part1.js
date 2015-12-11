module.exports = input => input.split('').reduce((a, b) => b === '(' ? a + 1 : a - 1, 0);
