'use strict';

/* Note: the confusing thing about this task is you can successfully parse the example input without
* actually understanding the goal. The real input actually requires some sort of lazy evaluation because
* you cannot actually derive the final signal on a wire until you know the full circuit schema.
* To achieve this below, I'm basically wrapping all operations in functions so that the value resolutions
* are deferred until after parsing is completed. An added bonus to this approach is the ability to query
* the circuit schema for just a single wire.
*/

// Abusing Uint16Array because I don't have enough bitwisdom to force JS 32bit numbers to overflow like 16bit
var overflow = (() => {
  var arr = new Uint16Array(1);
  return x => {
    arr.set([x]);
    return arr[0];
  };
})();

var instruction = fn => (left, right) => () => overflow(fn(left(), right()));

var instructions = {
  'AND': instruction((a, b) => a & b),
  'OR': instruction((a, b) => a | b),
  'LSHIFT': instruction((a, b) => a << b),
  'RSHIFT': instruction((a, b) => a >> b),
  'NOT': instruction((_, a) => ~a)
};

class Circuit {
  constructor() {
    this.wires = {};
    this.cache = {};
  }

  parse(line) {
    // Match value[1] -> wire[2]
    var matches = line.match(/^([a-z0-9]+)\s+->\s+([a-z]+)$/);
    if (matches) {
      this.wires[matches[2]] = this.getValue(matches[1]);
    }

    // Match value[1](optional) OPERAND[2] value[3] -> wire[4]
    matches = line.match(/^([a-z0-9]*)\s*([A-Z]+)\s+([a-z0-9]+)\s+->\s+([a-z]+)$/);
    if (matches) {
      this.wires[matches[4]] = instructions[matches[2]](this.getValue(matches[1]), this.getValue(matches[3]));
    }
  }

  memoize(wire) {
    if (typeof this.cache[wire] === 'undefined') {
      this.cache[wire] = this.wires[wire]();
    }

    return this.cache[wire];
  }

  getValue(value) {
    if (!value || /^\d+/.test(value)) {
      return () => +value;
    }

    return this.memoize.bind(this, value);
  }
};

module.exports = Circuit;
