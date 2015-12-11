module.exports = input => {
  var grid = {}, x = 0, y = 0, count = 1;
  input.split('').forEach(d => {
    x += d === '<' ? -1 : (d === '>' ? 1 : 0);
    y += d === '^' ? -1 : (d === 'v' ? 1 : 0);
    grid[y] = grid[y] || {};
    grid[y][x] = (grid[y][x] || 0) + 1;

    if (grid[y][x] === 1) {
      count += 1;
    }
  });

  return count;
};
