module.exports = input => String(input).replace(/(\d)\1*/g, (match, capture) => match.length + '' + capture);
