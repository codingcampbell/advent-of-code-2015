var Graph = require('./graph');

module.exports = input => {
  var graph = new Graph();

  input.split(/\n/).forEach(graph.parse.bind(graph));

  Object.keys(graph.nodes).forEach(person => {
    graph.add('Myself', person, 0);
    graph.nodes[person].relations.Myself = 0;
  });

  return graph.getRoutes().sort((a, b) => b.distance - a.distance)[0].distance;
}
