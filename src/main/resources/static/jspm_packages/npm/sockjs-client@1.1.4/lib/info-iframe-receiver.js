/* */ 
'use strict';
var inherits = require('inherits'),
    EventEmitter = require('./event/emitter').EventEmitter,
    JSON3 = require('json3'),
    XHRLocalObject = require('./transport/sender/xhr-local'),
    InfoAjax = require('./info-ajax');
;
function InfoReceiverIframe(transUrl) {
  var self = this;
  EventEmitter.call(this);
  this.ir = new InfoAjax(transUrl, XHRLocalObject);
  this.ir.once('finish', function(info, rtt) {
    self.ir = null;
    self.emit('message', JSON3.stringify([info, rtt]));
  });
}
inherits(InfoReceiverIframe, EventEmitter);
InfoReceiverIframe.transportName = 'iframe-info-receiver';
InfoReceiverIframe.prototype.close = function() {
  if (this.ir) {
    this.ir.close();
    this.ir = null;
  }
  this.removeAllListeners();
};
module.exports = InfoReceiverIframe;
