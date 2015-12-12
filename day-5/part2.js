var isNice = line => {
  // Must contain a pair of letters twice
  if (!/([a-z]{2}).*\1/i.test(line)) {
    return false;
  }

  // Must contain a letter twice with any single letter (same or not) in between
  if (!/([a-z])[a-z]\1/i.test(line)) {
    return false;
  }

  return true;
}

module.exports = input => input.split(/\n/).filter(isNice).length;
