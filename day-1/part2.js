require('fs').readFile('input.txt', (err, data) => {
  var count = 0;
  data.toString().split('').every((y, index) => {
    count += (y === '(' ? 1 : -1);

    return count >= 0 || console.log(index + 1);
  });
});
