var isNice = line => {
  // Must not contain ab, cd, pq, or xy
  if (/ab|cd|pq|xy/i.test(line)) {
    return false;
  }

  // Must contain 3+ vowels
  if (line.replace(/[^aeiou]+/ig, '').length < 3) {
    return false;
  }

  // Must contain a letter twice in a row
  if (!/([a-z])\1/i.test(line)) {
    return false;
  }

  return true;
}

module.exports = input => input.split(/\n/).filter(isNice).length;
