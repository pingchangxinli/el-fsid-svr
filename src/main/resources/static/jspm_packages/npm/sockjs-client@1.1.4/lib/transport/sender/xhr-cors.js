/* */ 
'use strict';
var inherits = require('inherits'),
    XhrDriver = require('../browser/abstract-xhr');
;
function XHRCorsObject(method, url, payload, opts) {
  XhrDriver.call(this, method, url, payload, opts);
}
inherits(XHRCorsObject, XhrDriver);
XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;
module.exports = XHRCorsObject;
