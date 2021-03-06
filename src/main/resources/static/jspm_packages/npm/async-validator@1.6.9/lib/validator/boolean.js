/* */ 
'use strict';
Object.defineProperty(exports, "__esModule", {value: true});
var _util = require('../util');
var _rule = require('../rule/index');
var _rule2 = _interopRequireDefault(_rule);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {"default": obj};
}
function boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if ((0, _util.isEmptyValue)(value) && !rule.required) {
      return callback();
    }
    _rule2["default"].required(rule, value, source, errors, options);
    if (value !== undefined) {
      _rule2["default"].type(rule, value, source, errors, options);
    }
  }
  callback(errors);
}
exports["default"] = boolean;
module.exports = exports['default'];
