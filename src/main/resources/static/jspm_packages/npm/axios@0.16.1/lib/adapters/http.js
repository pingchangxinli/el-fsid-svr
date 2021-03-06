/* */ 
(function(Buffer, process) {
  'use strict';
  var utils = require('../utils');
  var settle = require('../core/settle');
  var buildURL = require('../helpers/buildURL');
  var http = require('./xhr');
  var https = require('https');
  var httpFollow = require('follow-redirects').http;
  var httpsFollow = require('follow-redirects').https;
  var url = require('url');
  var zlib = require('zlib');
  var pkg = require('../../package.json!systemjs-json');
  var Buffer = require('buffer').Buffer;
  var createError = require('../core/createError');
  var enhanceError = require('../core/enhanceError');
  module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolve, reject) {
      var data = config.data;
      var headers = config.headers;
      var timer;
      var aborted = false;
      if (!headers['User-Agent'] && !headers['user-agent']) {
        headers['User-Agent'] = 'axios/' + pkg.version;
      }
      if (data && !utils.isStream(data)) {
        if (utils.isBuffer(data)) {} else if (utils.isArrayBuffer(data)) {
          data = new Buffer(new Uint8Array(data));
        } else if (utils.isString(data)) {
          data = new Buffer(data, 'utf-8');
        } else {
          return reject(createError('Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream', config));
        }
        headers['Content-Length'] = data.length;
      }
      var auth = undefined;
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        auth = username + ':' + password;
      }
      var parsed = url.parse(config.url);
      var protocol = parsed.protocol || 'http:';
      if (!auth && parsed.auth) {
        var urlAuth = parsed.auth.split(':');
        var urlUsername = urlAuth[0] || '';
        var urlPassword = urlAuth[1] || '';
        auth = urlUsername + ':' + urlPassword;
      }
      if (auth) {
        delete headers.Authorization;
      }
      var isHttps = protocol === 'https:';
      var agent = isHttps ? config.httpsAgent : config.httpAgent;
      var options = {
        hostname: parsed.hostname,
        port: parsed.port,
        path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
        method: config.method,
        headers: headers,
        agent: agent,
        auth: auth
      };
      var proxy = config.proxy;
      if (!proxy) {
        var proxyEnv = protocol.slice(0, -1) + '_proxy';
        var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
        if (proxyUrl) {
          var parsedProxyUrl = url.parse(proxyUrl);
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port
          };
          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
      if (proxy) {
        options.hostname = proxy.host;
        options.host = proxy.host;
        options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
        options.port = proxy.port;
        options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;
        if (proxy.auth) {
          var base64 = new Buffer(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
          options.headers['Proxy-Authorization'] = 'Basic ' + base64;
        }
      }
      var transport;
      if (config.maxRedirects === 0) {
        transport = isHttps ? https : http;
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        transport = isHttps ? httpsFollow : httpFollow;
      }
      var req = transport.request(options, function handleResponse(res) {
        if (aborted)
          return;
        clearTimeout(timer);
        timer = null;
        var stream = res;
        switch (res.headers['content-encoding']) {
          case 'gzip':
          case 'compress':
          case 'deflate':
            stream = stream.pipe(zlib.createUnzip());
            delete res.headers['content-encoding'];
            break;
        }
        var lastRequest = res.req || req;
        var response = {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config: config,
          request: lastRequest
        };
        if (config.responseType === 'stream') {
          response.data = stream;
          settle(resolve, reject, response);
        } else {
          var responseBuffer = [];
          stream.on('data', function handleStreamData(chunk) {
            responseBuffer.push(chunk);
            if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
              reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded', config));
            }
          });
          stream.on('error', function handleStreamError(err) {
            if (aborted)
              return;
            reject(enhanceError(err, config));
          });
          stream.on('end', function handleStreamEnd() {
            var responseData = Buffer.concat(responseBuffer);
            if (config.responseType !== 'arraybuffer') {
              responseData = responseData.toString('utf8');
            }
            response.data = responseData;
            settle(resolve, reject, response);
          });
        }
      });
      req.on('error', function handleRequestError(err) {
        if (aborted)
          return;
        reject(enhanceError(err, config));
      });
      if (config.timeout && !timer) {
        timer = setTimeout(function handleRequestTimeout() {
          req.abort();
          reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));
          aborted = true;
        }, config.timeout);
      }
      if (config.cancelToken) {
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (aborted) {
            return;
          }
          req.abort();
          reject(cancel);
          aborted = true;
        });
      }
      if (utils.isStream(data)) {
        data.pipe(req);
      } else {
        req.end(data);
      }
    });
  };
})(require('buffer').Buffer, require('process'));
