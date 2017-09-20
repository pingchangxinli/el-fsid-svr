/* */ 
'use strict';
var inherits = require('inherits'),
    XhrDriver = require('../browser/abstract-xhr');
;
function XHRLocalObject(method, url, payload) {
  XhrDriver.call(this, method, url, payload, {noCredentials: true});
}
inherits(XHRLocalObject, XhrDriver);
XHRLocalObject.enabled = XhrDriver.enabled;
module.exports = XHRLocalObject;
