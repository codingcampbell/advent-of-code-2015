var Circuit = require('./circuit');

module.exports = input => {
  var circuit = new Circuit();
  input.split(/\n/).forEach(circuit.parse.bind(circuit));

  circuit.parse(circuit.wires.a() + ' -> b');
  circuit.cache = {};
  return circuit.wires.a();
};
