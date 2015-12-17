module.exports = input => {
  var result = [];

  input.split(/\n/).forEach(line => {
    var matches = line.match(/^Sue (\d+): (.+)$/);
    if (!matches) {
      return;
    }

    var row = {};

    var properties = matches[2].match(/[^:,\s]+: \d+/g).map(x => x.split(': '));

    properties.forEach(prop => row[prop[0]] = +prop[1]);

    row.number = +matches[1];

    result.push(row);
  });

  return result;
};
