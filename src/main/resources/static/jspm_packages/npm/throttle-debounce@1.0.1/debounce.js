/* */ 
var throttle = require('./throttle');
module.exports = function(delay, atBegin, callback) {
  return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
};
