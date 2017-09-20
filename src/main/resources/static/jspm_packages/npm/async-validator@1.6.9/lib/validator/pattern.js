/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _rule = require('../rule/index');
var _rule2 = _interopRequireDefault(_rule);
var _util = require('../util');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
}
function pattern(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if ((0, _util.isEmptyValue)(value, 'string') && !rule.required) {
      return callback();
    }
    _rule2["default"].required(rule, value, source, errors, options);
    if (!(0, _util.isEmptyValue)(value, 'string')) {
      _rule2["default"].pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
exports["default"] = pattern;
module.exports = exports['default'];
