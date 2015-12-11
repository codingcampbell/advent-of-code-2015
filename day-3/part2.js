module.exports = input => {
  var grid = {}, santas = [{x: 0, y: 0}, {x: 0, y: 0}], count = 0;
  input.split('').forEach((d, index) => {
    var santa = santas[index % santas.length];
    santa.x += d === '<' ? -1 : (d === '>' ? 1 : 0);
    santa.y += d === '^' ? -1 : (d === 'v' ? 1 : 0);
    grid[santa.y] = grid[santa.y] || {};
    grid[santa.y][santa.x] = (grid[santa.y][santa.x] || 0) + 1;

    if (grid[santa.y][santa.x] === 1) {
      count += 1;
    }
  });

  return count;
};
