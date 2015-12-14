// Yes, this task could be done with eval() or JSON.stringify(), but where's the fun in that?

var parseEscape = (chars, result) => {
  chars.shift();
  result.encoded += '\\\\';
  result.count.code += 1;

  if (chars[0] !== 'x') {
    result.encoded += '\\';

    result.encoded += chars[0];
    chars.shift();
    result.count.inc();
    return;
  }


  // Consume chars for \xFF syntax
  result.encoded += chars.slice(0, 3).join('');
  chars.shift();
  chars.shift();
  chars.shift();
  result.count.code += 3;
  result.count.chars += 1;
};

module.exports = line => {
  var chars = line.split('');
  var result = {
    encoded: '',
    count: {
      chars: 0,
      code: 0,
      inc() {
        this.chars += 1;
        this.code += 1;
      }
    }
  };

  while (chars.length) {
    if (chars.length > 1 && chars[0] === '\\') {
      parseEscape(chars, result);
      continue;
    }


    if (chars[0] === '"') {
      // Note: escaped quotes will never be here, they are handled in parseEscape
      result.encoded += '\\';
      result.count.code += 1;
    } else {
      result.count.inc();
    }

    result.encoded += chars[0];
    chars.shift();
  }

  result.encoded = '"' + result.encoded + '"';

  return result;
};

