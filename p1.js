const Errors = require('./errors').P1;
// Returns the string length divided by a number n, with 3 digit precision
const divideStringLengthByN = (str, n) => {
  if (!str && !n) return Errors.NO_PARAMETERS; 
  if (!str) return Errors.STR_IS_MISSING; 
  if (!n) return Errors.N_IS_MISSING; 
  
  let _n = parseFloat(n);
  if (isNaN(_n)) return Errors.N_IS_NAN;
  if (_n < 1) return Errors.N_TO_LOW;
  if (_n > 20) return Errors.N_TO_HIGH;
  
  let res = (str.length / _n);
  res = res.toFixed(3);// toFixed avoid infinite digits values (ex: 1/3 = 0.3333333... becomes 0.333)
  res = parseFloat(res).toString(); // remove useless 0 digits
  
  return res.toString();
}

exports.divideStringLengthByN = divideStringLengthByN;