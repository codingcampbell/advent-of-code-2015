require('fs').readFile('input.txt', (err, data) => {
  console.log(data.toString().split('').reduce((a, b) => b === '(' ? a + 1 : a - 1, 0));
});
