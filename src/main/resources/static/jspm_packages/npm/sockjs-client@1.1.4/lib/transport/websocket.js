/* */ 
(function(process) {
  'use strict';
  var utils = require('../utils/event'),
      urlUtils = require('../utils/url'),
      inherits = require('inherits'),
      EventEmitter = require('../event/emitter').EventEmitter,
      WebsocketDriver = require('./browser/websocket');
  ;
  var debug = function() {};
  if (process.env.NODE_ENV !== 'production') {
    debug = require('debug')('sockjs-client:websocket');
  }
  function WebSocketTransport(transUrl, ignore, options) {
    if (!WebSocketTransport.enabled()) {
      throw new Error('Transport created when disabled');
    }
    EventEmitter.call(this);
    debug('constructor', transUrl);
    var self = this;
    var url = urlUtils.addPath(transUrl, '/websocket');
    if (url.slice(0, 5) === 'https') {
      url = 'wss' + url.slice(5);
    } else {
      url = 'ws' + url.slice(4);
    }
    this.url = url;
    this.ws = new WebsocketDriver(this.url, [], options);
    this.ws.onmessage = function(e) {
      debug('message event', e.data);
      self.emit('message', e.data);
    };
    this.unloadRef = utils.unloadAdd(function() {
      debug('unload');
      self.ws.close();
    });
    this.ws.onclose = function(e) {
      debug('close event', e.code, e.reason);
      self.emit('close', e.code, e.reason);
      self._cleanup();
    };
    this.ws.onerror = function(e) {
      debug('error event', e);
      self.emit('close', 1006, 'WebSocket connection broken');
      self._cleanup();
    };
  }
  inherits(WebSocketTransport, EventEmitter);
  WebSocketTransport.prototype.send = function(data) {
    var msg = '[' + data + ']';
    debug('send', msg);
    this.ws.send(msg);
  };
  WebSocketTransport.prototype.close = function() {
    debug('close');
    var ws = this.ws;
    this._cleanup();
    if (ws) {
      ws.close();
    }
  };
  WebSocketTransport.prototype._cleanup = function() {
    debug('_cleanup');
    var ws = this.ws;
    if (ws) {
      ws.onmessage = ws.onclose = ws.onerror = null;
    }
    utils.unloadDel(this.unloadRef);
    this.unloadRef = this.ws = null;
    this.removeAllListeners();
  };
  WebSocketTransport.enabled = function() {
    debug('enabled');
    return !!WebsocketDriver;
  };
  WebSocketTransport.transportName = 'websocket';
  WebSocketTransport.roundTrips = 2;
  module.exports = WebSocketTransport;
})(require('process'));