var Password = require('./password');

module.exports = input => {
  var password = new Password(input);
  return password.bump().password;
};
