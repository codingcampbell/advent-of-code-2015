var Graph = require('./graph');

module.exports = input => {
  var graph = new Graph();
  input.split(/\n/).forEach(graph.parse.bind(graph));

  return graph.getMinDistance();
}
