var Circuit = require('./circuit');

module.exports = input => {
  var circuit = new Circuit();
  input.split(/\n/).forEach(circuit.parse.bind(circuit));

  return circuit.wires.a();
};
