/* */ 
(function(Buffer) {
  var findProc = /Proc-Type: 4,ENCRYPTED\n\r?DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)\n\r?\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?/m;
  var startRegex = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----\n/m;
  var fullRegex = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?-----END \1-----$/m;
  var evp = require('evp_bytestokey');
  var ciphers = require('browserify-aes');
  module.exports = function(okey, password) {
    var key = okey.toString();
    var match = key.match(findProc);
    var decrypted;
    if (!match) {
      var match2 = key.match(fullRegex);
      decrypted = new Buffer(match2[2].replace(/\r?\n/g, ''), 'base64');
    } else {
      var suite = 'aes' + match[1];
      var iv = new Buffer(match[2], 'hex');
      var cipherText = new Buffer(match[3].replace(/\r?\n/g, ''), 'base64');
      var cipherKey = evp(password, iv.slice(0, 8), parseInt(match[1], 10)).key;
      var out = [];
      var cipher = ciphers.createDecipheriv(suite, cipherKey, iv);
      out.push(cipher.update(cipherText));
      out.push(cipher.final());
      decrypted = Buffer.concat(out);
    }
    var tag = key.match(startRegex)[1];
    return {
      tag: tag,
      data: decrypted
    };
  };
})(require('buffer').Buffer);
