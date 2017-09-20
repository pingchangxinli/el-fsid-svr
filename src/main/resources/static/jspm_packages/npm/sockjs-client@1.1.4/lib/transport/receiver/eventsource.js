/* */ 
(function(process) {
  'use strict';
  var inherits = require('inherits'),
      EventEmitter = require('../../event/emitter').EventEmitter,
      EventSourceDriver = require('../browser/eventsource');
  ;
  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:receiver:eventsource');
  }
  function EventSourceReceiver(url) {
    debug(url);
    EventEmitter.call(this);
    var self = this;
    var es = this.es = new EventSourceDriver(url);
    es.onmessage = function(e) {
      debug('message', e.data);
      self.emit('message', decodeURI(e.data));
    };
    es.onerror = function(e) {
      debug('error', es.readyState, e);
      var reason = (es.readyState !== 2 ? 'network' : 'permanent');
      self._cleanup();
      self._close(reason);
    };
  }
  inherits(EventSourceReceiver, EventEmitter);
  EventSourceReceiver.prototype.abort = function() {
    debug('abort');
    this._cleanup();
    this._close('user');
  };
  EventSourceReceiver.prototype._cleanup = function() {
    debug('cleanup');
    var es = this.es;
    if (es) {
      es.onmessage = es.onerror = null;
      es.close();
      this.es = null;
    }
  };
  EventSourceReceiver.prototype._close = function(reason) {
    debug('close', reason);
    var self = this;
    setTimeout(function() {
      self.emit('close', null, reason);
      self.removeAllListeners();
    }, 200);
  };
  module.exports = EventSourceReceiver;
})(require('process'));