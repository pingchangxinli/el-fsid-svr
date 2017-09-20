/* */ 
"format cjs";
(function(Buffer, process) {
  (function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
      module.exports = factory();
    else if (typeof define === 'function' && define.amd)
      define([], factory);
    else if (typeof exports === 'object')
      exports["axios"] = factory();
    else
      root["axios"] = factory();
  })(this, function() {
    return (function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
          return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
          exports: {},
          id: moduleId,
          loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.p = "";
      return __webpack_require__(0);
    })([function(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(1);
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var bind = __webpack_require__(7);
      var Axios = __webpack_require__(8);
      var defaults = __webpack_require__(9);
      function createInstance(defaultConfig) {
        var context = new Axios(defaultConfig);
        var instance = bind(Axios.prototype.request, context);
        utils.extend(instance, Axios.prototype, context);
        utils.extend(instance, context);
        return instance;
      }
      var axios = createInstance(defaults);
      axios.Axios = Axios;
      axios.create = function create(instanceConfig) {
        return createInstance(utils.merge(defaults, instanceConfig));
      };
      axios.Cancel = __webpack_require__(26);
      axios.CancelToken = __webpack_require__(27);
      axios.isCancel = __webpack_require__(23);
      axios.all = function all(promises) {
        return Promise.all(promises);
      };
      axios.spread = __webpack_require__(28);
      module.exports = axios;
      module.exports.default = axios;
    }, function(module, exports, __webpack_require__) {
      (function(Buffer) {
        'use strict';
        var bind = __webpack_require__(7);
        var toString = Object.prototype.toString;
        function isArray(val) {
          return toString.call(val) === '[object Array]';
        }
        function isBuffer(val) {
          return ((typeof Buffer !== 'undefined') && (Buffer.isBuffer) && (Buffer.isBuffer(val)));
        }
        function isArrayBuffer(val) {
          return toString.call(val) === '[object ArrayBuffer]';
        }
        function isFormData(val) {
          return (typeof FormData !== 'undefined') && (val instanceof FormData);
        }
        function isArrayBufferView(val) {
          var result;
          if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
            result = ArrayBuffer.isView(val);
          } else {
            result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
          }
          return result;
        }
        function isString(val) {
          return typeof val === 'string';
        }
        function isNumber(val) {
          return typeof val === 'number';
        }
        function isUndefined(val) {
          return typeof val === 'undefined';
        }
        function isObject(val) {
          return val !== null && typeof val === 'object';
        }
        function isDate(val) {
          return toString.call(val) === '[object Date]';
        }
        function isFile(val) {
          return toString.call(val) === '[object File]';
        }
        function isBlob(val) {
          return toString.call(val) === '[object Blob]';
        }
        function isFunction(val) {
          return toString.call(val) === '[object Function]';
        }
        function isStream(val) {
          return isObject(val) && isFunction(val.pipe);
        }
        function isURLSearchParams(val) {
          return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
        }
        function trim(str) {
          return str.replace(/^\s*/, '').replace(/\s*$/, '');
        }
        function isStandardBrowserEnv() {
          if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
            return false;
          }
          return (typeof window !== 'undefined' && typeof document !== 'undefined');
        }
        function forEach(obj, fn) {
          if (obj === null || typeof obj === 'undefined') {
            return;
          }
          if (typeof obj !== 'object' && !isArray(obj)) {
            obj = [obj];
          }
          if (isArray(obj)) {
            for (var i = 0,
                l = obj.length; i < l; i++) {
              fn.call(null, obj[i], i, obj);
            }
          } else {
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
              }
            }
          }
        }
        function merge() {
          var result = {};
          function assignValue(val, key) {
            if (typeof result[key] === 'object' && typeof val === 'object') {
              result[key] = merge(result[key], val);
            } else {
              result[key] = val;
            }
          }
          for (var i = 0,
              l = arguments.length; i < l; i++) {
            forEach(arguments[i], assignValue);
          }
          return result;
        }
        function extend(a, b, thisArg) {
          forEach(b, function assignValue(val, key) {
            if (thisArg && typeof val === 'function') {
              a[key] = bind(val, thisArg);
            } else {
              a[key] = val;
            }
          });
          return a;
        }
        module.exports = {
          isArray: isArray,
          isArrayBuffer: isArrayBuffer,
          isBuffer: isBuffer,
          isFormData: isFormData,
          isArrayBufferView: isArrayBufferView,
          isString: isString,
          isNumber: isNumber,
          isObject: isObject,
          isUndefined: isUndefined,
          isDate: isDate,
          isFile: isFile,
          isBlob: isBlob,
          isFunction: isFunction,
          isStream: isStream,
          isURLSearchParams: isURLSearchParams,
          isStandardBrowserEnv: isStandardBrowserEnv,
          forEach: forEach,
          merge: merge,
          extend: extend,
          trim: trim
        };
      }.call(exports, __webpack_require__(3).Buffer));
    }, function(module, exports, __webpack_require__) {
      (function(global) {
        'use strict';
        var base64 = __webpack_require__(4);
        var ieee754 = __webpack_require__(5);
        var isArray = __webpack_require__(6);
        exports.Buffer = Buffer;
        exports.SlowBuffer = SlowBuffer;
        exports.INSPECT_MAX_BYTES = 50;
        Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();
        exports.kMaxLength = kMaxLength();
        function typedArraySupport() {
          try {
            var arr = new Uint8Array(1);
            arr.__proto__ = {
              __proto__: Uint8Array.prototype,
              foo: function() {
                return 42;
              }
            };
            return arr.foo() === 42 && typeof arr.subarray === 'function' && arr.subarray(1, 1).byteLength === 0;
          } catch (e) {
            return false;
          }
        }
        function kMaxLength() {
          return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
        }
        function createBuffer(that, length) {
          if (kMaxLength() < length) {
            throw new RangeError('Invalid typed array length');
          }
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            that = new Uint8Array(length);
            that.__proto__ = Buffer.prototype;
          } else {
            if (that === null) {
              that = new Buffer(length);
            }
            that.length = length;
          }
          return that;
        }
        function Buffer(arg, encodingOrOffset, length) {
          if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
            return new Buffer(arg, encodingOrOffset, length);
          }
          if (typeof arg === 'number') {
            if (typeof encodingOrOffset === 'string') {
              throw new Error('If encoding is specified then the first argument must be a string');
            }
            return allocUnsafe(this, arg);
          }
          return from(this, arg, encodingOrOffset, length);
        }
        Buffer.poolSize = 8192;
        Buffer._augment = function(arr) {
          arr.__proto__ = Buffer.prototype;
          return arr;
        };
        function from(that, value, encodingOrOffset, length) {
          if (typeof value === 'number') {
            throw new TypeError('"value" argument must not be a number');
          }
          if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
            return fromArrayBuffer(that, value, encodingOrOffset, length);
          }
          if (typeof value === 'string') {
            return fromString(that, value, encodingOrOffset);
          }
          return fromObject(that, value);
        }
        Buffer.from = function(value, encodingOrOffset, length) {
          return from(null, value, encodingOrOffset, length);
        };
        if (Buffer.TYPED_ARRAY_SUPPORT) {
          Buffer.prototype.__proto__ = Uint8Array.prototype;
          Buffer.__proto__ = Uint8Array;
          if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
            Object.defineProperty(Buffer, Symbol.species, {
              value: null,
              configurable: true
            });
          }
        }
        function assertSize(size) {
          if (typeof size !== 'number') {
            throw new TypeError('"size" argument must be a number');
          } else if (size < 0) {
            throw new RangeError('"size" argument must not be negative');
          }
        }
        function alloc(that, size, fill, encoding) {
          assertSize(size);
          if (size <= 0) {
            return createBuffer(that, size);
          }
          if (fill !== undefined) {
            return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
          }
          return createBuffer(that, size);
        }
        Buffer.alloc = function(size, fill, encoding) {
          return alloc(null, size, fill, encoding);
        };
        function allocUnsafe(that, size) {
          assertSize(size);
          that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
          if (!Buffer.TYPED_ARRAY_SUPPORT) {
            for (var i = 0; i < size; ++i) {
              that[i] = 0;
            }
          }
          return that;
        }
        Buffer.allocUnsafe = function(size) {
          return allocUnsafe(null, size);
        };
        Buffer.allocUnsafeSlow = function(size) {
          return allocUnsafe(null, size);
        };
        function fromString(that, string, encoding) {
          if (typeof encoding !== 'string' || encoding === '') {
            encoding = 'utf8';
          }
          if (!Buffer.isEncoding(encoding)) {
            throw new TypeError('"encoding" must be a valid string encoding');
          }
          var length = byteLength(string, encoding) | 0;
          that = createBuffer(that, length);
          var actual = that.write(string, encoding);
          if (actual !== length) {
            that = that.slice(0, actual);
          }
          return that;
        }
        function fromArrayLike(that, array) {
          var length = array.length < 0 ? 0 : checked(array.length) | 0;
          that = createBuffer(that, length);
          for (var i = 0; i < length; i += 1) {
            that[i] = array[i] & 255;
          }
          return that;
        }
        function fromArrayBuffer(that, array, byteOffset, length) {
          array.byteLength;
          if (byteOffset < 0 || array.byteLength < byteOffset) {
            throw new RangeError('\'offset\' is out of bounds');
          }
          if (array.byteLength < byteOffset + (length || 0)) {
            throw new RangeError('\'length\' is out of bounds');
          }
          if (byteOffset === undefined && length === undefined) {
            array = new Uint8Array(array);
          } else if (length === undefined) {
            array = new Uint8Array(array, byteOffset);
          } else {
            array = new Uint8Array(array, byteOffset, length);
          }
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            that = array;
            that.__proto__ = Buffer.prototype;
          } else {
            that = fromArrayLike(that, array);
          }
          return that;
        }
        function fromObject(that, obj) {
          if (Buffer.isBuffer(obj)) {
            var len = checked(obj.length) | 0;
            that = createBuffer(that, len);
            if (that.length === 0) {
              return that;
            }
            obj.copy(that, 0, 0, len);
            return that;
          }
          if (obj) {
            if ((typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
              if (typeof obj.length !== 'number' || isnan(obj.length)) {
                return createBuffer(that, 0);
              }
              return fromArrayLike(that, obj);
            }
            if (obj.type === 'Buffer' && isArray(obj.data)) {
              return fromArrayLike(that, obj.data);
            }
          }
          throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
        }
        function checked(length) {
          if (length >= kMaxLength()) {
            throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
          }
          return length | 0;
        }
        function SlowBuffer(length) {
          if (+length != length) {
            length = 0;
          }
          return Buffer.alloc(+length);
        }
        Buffer.isBuffer = function isBuffer(b) {
          return !!(b != null && b._isBuffer);
        };
        Buffer.compare = function compare(a, b) {
          if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
            throw new TypeError('Arguments must be Buffers');
          }
          if (a === b)
            return 0;
          var x = a.length;
          var y = b.length;
          for (var i = 0,
              len = Math.min(x, y); i < len; ++i) {
            if (a[i] !== b[i]) {
              x = a[i];
              y = b[i];
              break;
            }
          }
          if (x < y)
            return -1;
          if (y < x)
            return 1;
          return 0;
        };
        Buffer.isEncoding = function isEncoding(encoding) {
          switch (String(encoding).toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'latin1':
            case 'binary':
            case 'base64':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return true;
            default:
              return false;
          }
        };
        Buffer.concat = function concat(list, length) {
          if (!isArray(list)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          if (list.length === 0) {
            return Buffer.alloc(0);
          }
          var i;
          if (length === undefined) {
            length = 0;
            for (i = 0; i < list.length; ++i) {
              length += list[i].length;
            }
          }
          var buffer = Buffer.allocUnsafe(length);
          var pos = 0;
          for (i = 0; i < list.length; ++i) {
            var buf = list[i];
            if (!Buffer.isBuffer(buf)) {
              throw new TypeError('"list" argument must be an Array of Buffers');
            }
            buf.copy(buffer, pos);
            pos += buf.length;
          }
          return buffer;
        };
        function byteLength(string, encoding) {
          if (Buffer.isBuffer(string)) {
            return string.length;
          }
          if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
            return string.byteLength;
          }
          if (typeof string !== 'string') {
            string = '' + string;
          }
          var len = string.length;
          if (len === 0)
            return 0;
          var loweredCase = false;
          for (; ; ) {
            switch (encoding) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return len;
              case 'utf8':
              case 'utf-8':
              case undefined:
                return utf8ToBytes(string).length;
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return len * 2;
              case 'hex':
                return len >>> 1;
              case 'base64':
                return base64ToBytes(string).length;
              default:
                if (loweredCase)
                  return utf8ToBytes(string).length;
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        }
        Buffer.byteLength = byteLength;
        function slowToString(encoding, start, end) {
          var loweredCase = false;
          if (start === undefined || start < 0) {
            start = 0;
          }
          if (start > this.length) {
            return '';
          }
          if (end === undefined || end > this.length) {
            end = this.length;
          }
          if (end <= 0) {
            return '';
          }
          end >>>= 0;
          start >>>= 0;
          if (end <= start) {
            return '';
          }
          if (!encoding)
            encoding = 'utf8';
          while (true) {
            switch (encoding) {
              case 'hex':
                return hexSlice(this, start, end);
              case 'utf8':
              case 'utf-8':
                return utf8Slice(this, start, end);
              case 'ascii':
                return asciiSlice(this, start, end);
              case 'latin1':
              case 'binary':
                return latin1Slice(this, start, end);
              case 'base64':
                return base64Slice(this, start, end);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return utf16leSlice(this, start, end);
              default:
                if (loweredCase)
                  throw new TypeError('Unknown encoding: ' + encoding);
                encoding = (encoding + '').toLowerCase();
                loweredCase = true;
            }
          }
        }
        Buffer.prototype._isBuffer = true;
        function swap(b, n, m) {
          var i = b[n];
          b[n] = b[m];
          b[m] = i;
        }
        Buffer.prototype.swap16 = function swap16() {
          var len = this.length;
          if (len % 2 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 16-bits');
          }
          for (var i = 0; i < len; i += 2) {
            swap(this, i, i + 1);
          }
          return this;
        };
        Buffer.prototype.swap32 = function swap32() {
          var len = this.length;
          if (len % 4 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 32-bits');
          }
          for (var i = 0; i < len; i += 4) {
            swap(this, i, i + 3);
            swap(this, i + 1, i + 2);
          }
          return this;
        };
        Buffer.prototype.swap64 = function swap64() {
          var len = this.length;
          if (len % 8 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 64-bits');
          }
          for (var i = 0; i < len; i += 8) {
            swap(this, i, i + 7);
            swap(this, i + 1, i + 6);
            swap(this, i + 2, i + 5);
            swap(this, i + 3, i + 4);
          }
          return this;
        };
        Buffer.prototype.toString = function toString() {
          var length = this.length | 0;
          if (length === 0)
            return '';
          if (arguments.length === 0)
            return utf8Slice(this, 0, length);
          return slowToString.apply(this, arguments);
        };
        Buffer.prototype.equals = function equals(b) {
          if (!Buffer.isBuffer(b))
            throw new TypeError('Argument must be a Buffer');
          if (this === b)
            return true;
          return Buffer.compare(this, b) === 0;
        };
        Buffer.prototype.inspect = function inspect() {
          var str = '';
          var max = exports.INSPECT_MAX_BYTES;
          if (this.length > 0) {
            str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
            if (this.length > max)
              str += ' ... ';
          }
          return '<Buffer ' + str + '>';
        };
        Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
          if (!Buffer.isBuffer(target)) {
            throw new TypeError('Argument must be a Buffer');
          }
          if (start === undefined) {
            start = 0;
          }
          if (end === undefined) {
            end = target ? target.length : 0;
          }
          if (thisStart === undefined) {
            thisStart = 0;
          }
          if (thisEnd === undefined) {
            thisEnd = this.length;
          }
          if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
            throw new RangeError('out of range index');
          }
          if (thisStart >= thisEnd && start >= end) {
            return 0;
          }
          if (thisStart >= thisEnd) {
            return -1;
          }
          if (start >= end) {
            return 1;
          }
          start >>>= 0;
          end >>>= 0;
          thisStart >>>= 0;
          thisEnd >>>= 0;
          if (this === target)
            return 0;
          var x = thisEnd - thisStart;
          var y = end - start;
          var len = Math.min(x, y);
          var thisCopy = this.slice(thisStart, thisEnd);
          var targetCopy = target.slice(start, end);
          for (var i = 0; i < len; ++i) {
            if (thisCopy[i] !== targetCopy[i]) {
              x = thisCopy[i];
              y = targetCopy[i];
              break;
            }
          }
          if (x < y)
            return -1;
          if (y < x)
            return 1;
          return 0;
        };
        function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
          if (buffer.length === 0)
            return -1;
          if (typeof byteOffset === 'string') {
            encoding = byteOffset;
            byteOffset = 0;
          } else if (byteOffset > 0x7fffffff) {
            byteOffset = 0x7fffffff;
          } else if (byteOffset < -0x80000000) {
            byteOffset = -0x80000000;
          }
          byteOffset = +byteOffset;
          if (isNaN(byteOffset)) {
            byteOffset = dir ? 0 : (buffer.length - 1);
          }
          if (byteOffset < 0)
            byteOffset = buffer.length + byteOffset;
          if (byteOffset >= buffer.length) {
            if (dir)
              return -1;
            else
              byteOffset = buffer.length - 1;
          } else if (byteOffset < 0) {
            if (dir)
              byteOffset = 0;
            else
              return -1;
          }
          if (typeof val === 'string') {
            val = Buffer.from(val, encoding);
          }
          if (Buffer.isBuffer(val)) {
            if (val.length === 0) {
              return -1;
            }
            return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
          } else if (typeof val === 'number') {
            val = val & 0xFF;
            if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
              if (dir) {
                return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
              } else {
                return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
              }
            }
            return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
          }
          throw new TypeError('val must be string, number or Buffer');
        }
        function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
          var indexSize = 1;
          var arrLength = arr.length;
          var valLength = val.length;
          if (encoding !== undefined) {
            encoding = String(encoding).toLowerCase();
            if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
              if (arr.length < 2 || val.length < 2) {
                return -1;
              }
              indexSize = 2;
              arrLength /= 2;
              valLength /= 2;
              byteOffset /= 2;
            }
          }
          function read(buf, i) {
            if (indexSize === 1) {
              return buf[i];
            } else {
              return buf.readUInt16BE(i * indexSize);
            }
          }
          var i;
          if (dir) {
            var foundIndex = -1;
            for (i = byteOffset; i < arrLength; i++) {
              if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                if (foundIndex === -1)
                  foundIndex = i;
                if (i - foundIndex + 1 === valLength)
                  return foundIndex * indexSize;
              } else {
                if (foundIndex !== -1)
                  i -= i - foundIndex;
                foundIndex = -1;
              }
            }
          } else {
            if (byteOffset + valLength > arrLength)
              byteOffset = arrLength - valLength;
            for (i = byteOffset; i >= 0; i--) {
              var found = true;
              for (var j = 0; j < valLength; j++) {
                if (read(arr, i + j) !== read(val, j)) {
                  found = false;
                  break;
                }
              }
              if (found)
                return i;
            }
          }
          return -1;
        }
        Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
          return this.indexOf(val, byteOffset, encoding) !== -1;
        };
        Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
        };
        Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
        };
        function hexWrite(buf, string, offset, length) {
          offset = Number(offset) || 0;
          var remaining = buf.length - offset;
          if (!length) {
            length = remaining;
          } else {
            length = Number(length);
            if (length > remaining) {
              length = remaining;
            }
          }
          var strLen = string.length;
          if (strLen % 2 !== 0)
            throw new TypeError('Invalid hex string');
          if (length > strLen / 2) {
            length = strLen / 2;
          }
          for (var i = 0; i < length; ++i) {
            var parsed = parseInt(string.substr(i * 2, 2), 16);
            if (isNaN(parsed))
              return i;
            buf[offset + i] = parsed;
          }
          return i;
        }
        function utf8Write(buf, string, offset, length) {
          return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
        }
        function asciiWrite(buf, string, offset, length) {
          return blitBuffer(asciiToBytes(string), buf, offset, length);
        }
        function latin1Write(buf, string, offset, length) {
          return asciiWrite(buf, string, offset, length);
        }
        function base64Write(buf, string, offset, length) {
          return blitBuffer(base64ToBytes(string), buf, offset, length);
        }
        function ucs2Write(buf, string, offset, length) {
          return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
        }
        Buffer.prototype.write = function write(string, offset, length, encoding) {
          if (offset === undefined) {
            encoding = 'utf8';
            length = this.length;
            offset = 0;
          } else if (length === undefined && typeof offset === 'string') {
            encoding = offset;
            length = this.length;
            offset = 0;
          } else if (isFinite(offset)) {
            offset = offset | 0;
            if (isFinite(length)) {
              length = length | 0;
              if (encoding === undefined)
                encoding = 'utf8';
            } else {
              encoding = length;
              length = undefined;
            }
          } else {
            throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
          }
          var remaining = this.length - offset;
          if (length === undefined || length > remaining)
            length = remaining;
          if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
            throw new RangeError('Attempt to write outside buffer bounds');
          }
          if (!encoding)
            encoding = 'utf8';
          var loweredCase = false;
          for (; ; ) {
            switch (encoding) {
              case 'hex':
                return hexWrite(this, string, offset, length);
              case 'utf8':
              case 'utf-8':
                return utf8Write(this, string, offset, length);
              case 'ascii':
                return asciiWrite(this, string, offset, length);
              case 'latin1':
              case 'binary':
                return latin1Write(this, string, offset, length);
              case 'base64':
                return base64Write(this, string, offset, length);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return ucs2Write(this, string, offset, length);
              default:
                if (loweredCase)
                  throw new TypeError('Unknown encoding: ' + encoding);
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
            }
          }
        };
        Buffer.prototype.toJSON = function toJSON() {
          return {
            type: 'Buffer',
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        };
        function base64Slice(buf, start, end) {
          if (start === 0 && end === buf.length) {
            return base64.fromByteArray(buf);
          } else {
            return base64.fromByteArray(buf.slice(start, end));
          }
        }
        function utf8Slice(buf, start, end) {
          end = Math.min(buf.length, end);
          var res = [];
          var i = start;
          while (i < end) {
            var firstByte = buf[i];
            var codePoint = null;
            var bytesPerSequence = (firstByte > 0xEF) ? 4 : (firstByte > 0xDF) ? 3 : (firstByte > 0xBF) ? 2 : 1;
            if (i + bytesPerSequence <= end) {
              var secondByte,
                  thirdByte,
                  fourthByte,
                  tempCodePoint;
              switch (bytesPerSequence) {
                case 1:
                  if (firstByte < 0x80) {
                    codePoint = firstByte;
                  }
                  break;
                case 2:
                  secondByte = buf[i + 1];
                  if ((secondByte & 0xC0) === 0x80) {
                    tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
                    if (tempCodePoint > 0x7F) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 3:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                    tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
                    if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                      codePoint = tempCodePoint;
                    }
                  }
                  break;
                case 4:
                  secondByte = buf[i + 1];
                  thirdByte = buf[i + 2];
                  fourthByte = buf[i + 3];
                  if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                    tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
                    if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                      codePoint = tempCodePoint;
                    }
                  }
              }
            }
            if (codePoint === null) {
              codePoint = 0xFFFD;
              bytesPerSequence = 1;
            } else if (codePoint > 0xFFFF) {
              codePoint -= 0x10000;
              res.push(codePoint >>> 10 & 0x3FF | 0xD800);
              codePoint = 0xDC00 | codePoint & 0x3FF;
            }
            res.push(codePoint);
            i += bytesPerSequence;
          }
          return decodeCodePointsArray(res);
        }
        var MAX_ARGUMENTS_LENGTH = 0x1000;
        function decodeCodePointsArray(codePoints) {
          var len = codePoints.length;
          if (len <= MAX_ARGUMENTS_LENGTH) {
            return String.fromCharCode.apply(String, codePoints);
          }
          var res = '';
          var i = 0;
          while (i < len) {
            res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
          }
          return res;
        }
        function asciiSlice(buf, start, end) {
          var ret = '';
          end = Math.min(buf.length, end);
          for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i] & 0x7F);
          }
          return ret;
        }
        function latin1Slice(buf, start, end) {
          var ret = '';
          end = Math.min(buf.length, end);
          for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i]);
          }
          return ret;
        }
        function hexSlice(buf, start, end) {
          var len = buf.length;
          if (!start || start < 0)
            start = 0;
          if (!end || end < 0 || end > len)
            end = len;
          var out = '';
          for (var i = start; i < end; ++i) {
            out += toHex(buf[i]);
          }
          return out;
        }
        function utf16leSlice(buf, start, end) {
          var bytes = buf.slice(start, end);
          var res = '';
          for (var i = 0; i < bytes.length; i += 2) {
            res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
          }
          return res;
        }
        Buffer.prototype.slice = function slice(start, end) {
          var len = this.length;
          start = ~~start;
          end = end === undefined ? len : ~~end;
          if (start < 0) {
            start += len;
            if (start < 0)
              start = 0;
          } else if (start > len) {
            start = len;
          }
          if (end < 0) {
            end += len;
            if (end < 0)
              end = 0;
          } else if (end > len) {
            end = len;
          }
          if (end < start)
            end = start;
          var newBuf;
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            newBuf = this.subarray(start, end);
            newBuf.__proto__ = Buffer.prototype;
          } else {
            var sliceLen = end - start;
            newBuf = new Buffer(sliceLen, undefined);
            for (var i = 0; i < sliceLen; ++i) {
              newBuf[i] = this[i + start];
            }
          }
          return newBuf;
        };
        function checkOffset(offset, ext, length) {
          if ((offset % 1) !== 0 || offset < 0)
            throw new RangeError('offset is not uint');
          if (offset + ext > length)
            throw new RangeError('Trying to access beyond buffer length');
        }
        Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert)
            checkOffset(offset, byteLength, this.length);
          var val = this[offset];
          var mul = 1;
          var i = 0;
          while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul;
          }
          return val;
        };
        Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert) {
            checkOffset(offset, byteLength, this.length);
          }
          var val = this[offset + --byteLength];
          var mul = 1;
          while (byteLength > 0 && (mul *= 0x100)) {
            val += this[offset + --byteLength] * mul;
          }
          return val;
        };
        Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 1, this.length);
          return this[offset];
        };
        Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          return this[offset] | (this[offset + 1] << 8);
        };
        Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          return (this[offset] << 8) | this[offset + 1];
        };
        Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return ((this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16)) + (this[offset + 3] * 0x1000000);
        };
        Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return (this[offset] * 0x1000000) + ((this[offset + 1] << 16) | (this[offset + 2] << 8) | this[offset + 3]);
        };
        Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert)
            checkOffset(offset, byteLength, this.length);
          var val = this[offset];
          var mul = 1;
          var i = 0;
          while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul;
          }
          mul *= 0x80;
          if (val >= mul)
            val -= Math.pow(2, 8 * byteLength);
          return val;
        };
        Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert)
            checkOffset(offset, byteLength, this.length);
          var i = byteLength;
          var mul = 1;
          var val = this[offset + --i];
          while (i > 0 && (mul *= 0x100)) {
            val += this[offset + --i] * mul;
          }
          mul *= 0x80;
          if (val >= mul)
            val -= Math.pow(2, 8 * byteLength);
          return val;
        };
        Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 1, this.length);
          if (!(this[offset] & 0x80))
            return (this[offset]);
          return ((0xff - this[offset] + 1) * -1);
        };
        Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          var val = this[offset] | (this[offset + 1] << 8);
          return (val & 0x8000) ? val | 0xFFFF0000 : val;
        };
        Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 2, this.length);
          var val = this[offset + 1] | (this[offset] << 8);
          return (val & 0x8000) ? val | 0xFFFF0000 : val;
        };
        Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return (this[offset]) | (this[offset + 1] << 8) | (this[offset + 2] << 16) | (this[offset + 3] << 24);
        };
        Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return (this[offset] << 24) | (this[offset + 1] << 16) | (this[offset + 2] << 8) | (this[offset + 3]);
        };
        Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, true, 23, 4);
        };
        Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 4, this.length);
          return ieee754.read(this, offset, false, 23, 4);
        };
        Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, true, 52, 8);
        };
        Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
          if (!noAssert)
            checkOffset(offset, 8, this.length);
          return ieee754.read(this, offset, false, 52, 8);
        };
        function checkInt(buf, value, offset, ext, max, min) {
          if (!Buffer.isBuffer(buf))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (value > max || value < min)
            throw new RangeError('"value" argument is out of bounds');
          if (offset + ext > buf.length)
            throw new RangeError('Index out of range');
        }
        Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength) - 1;
            checkInt(this, value, offset, byteLength, maxBytes, 0);
          }
          var mul = 1;
          var i = 0;
          this[offset] = value & 0xFF;
          while (++i < byteLength && (mul *= 0x100)) {
            this[offset + i] = (value / mul) & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset | 0;
          byteLength = byteLength | 0;
          if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength) - 1;
            checkInt(this, value, offset, byteLength, maxBytes, 0);
          }
          var i = byteLength - 1;
          var mul = 1;
          this[offset + i] = value & 0xFF;
          while (--i >= 0 && (mul *= 0x100)) {
            this[offset + i] = (value / mul) & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 1, 0xff, 0);
          if (!Buffer.TYPED_ARRAY_SUPPORT)
            value = Math.floor(value);
          this[offset] = (value & 0xff);
          return offset + 1;
        };
        function objectWriteUInt16(buf, value, offset, littleEndian) {
          if (value < 0)
            value = 0xffff + value + 1;
          for (var i = 0,
              j = Math.min(buf.length - offset, 2); i < j; ++i) {
            buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>> (littleEndian ? i : 1 - i) * 8;
          }
        }
        Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 0xffff, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value & 0xff);
            this[offset + 1] = (value >>> 8);
          } else {
            objectWriteUInt16(this, value, offset, true);
          }
          return offset + 2;
        };
        Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 0xffff, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value >>> 8);
            this[offset + 1] = (value & 0xff);
          } else {
            objectWriteUInt16(this, value, offset, false);
          }
          return offset + 2;
        };
        function objectWriteUInt32(buf, value, offset, littleEndian) {
          if (value < 0)
            value = 0xffffffff + value + 1;
          for (var i = 0,
              j = Math.min(buf.length - offset, 4); i < j; ++i) {
            buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
          }
        }
        Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 0xffffffff, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset + 3] = (value >>> 24);
            this[offset + 2] = (value >>> 16);
            this[offset + 1] = (value >>> 8);
            this[offset] = (value & 0xff);
          } else {
            objectWriteUInt32(this, value, offset, true);
          }
          return offset + 4;
        };
        Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 0xffffffff, 0);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value >>> 24);
            this[offset + 1] = (value >>> 16);
            this[offset + 2] = (value >>> 8);
            this[offset + 3] = (value & 0xff);
          } else {
            objectWriteUInt32(this, value, offset, false);
          }
          return offset + 4;
        };
        Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength - 1);
            checkInt(this, value, offset, byteLength, limit - 1, -limit);
          }
          var i = 0;
          var mul = 1;
          var sub = 0;
          this[offset] = value & 0xFF;
          while (++i < byteLength && (mul *= 0x100)) {
            if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
              sub = 1;
            }
            this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength - 1);
            checkInt(this, value, offset, byteLength, limit - 1, -limit);
          }
          var i = byteLength - 1;
          var mul = 1;
          var sub = 0;
          this[offset + i] = value & 0xFF;
          while (--i >= 0 && (mul *= 0x100)) {
            if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
              sub = 1;
            }
            this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
          }
          return offset + byteLength;
        };
        Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 1, 0x7f, -0x80);
          if (!Buffer.TYPED_ARRAY_SUPPORT)
            value = Math.floor(value);
          if (value < 0)
            value = 0xff + value + 1;
          this[offset] = (value & 0xff);
          return offset + 1;
        };
        Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 0x7fff, -0x8000);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value & 0xff);
            this[offset + 1] = (value >>> 8);
          } else {
            objectWriteUInt16(this, value, offset, true);
          }
          return offset + 2;
        };
        Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 2, 0x7fff, -0x8000);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value >>> 8);
            this[offset + 1] = (value & 0xff);
          } else {
            objectWriteUInt16(this, value, offset, false);
          }
          return offset + 2;
        };
        Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value & 0xff);
            this[offset + 1] = (value >>> 8);
            this[offset + 2] = (value >>> 16);
            this[offset + 3] = (value >>> 24);
          } else {
            objectWriteUInt32(this, value, offset, true);
          }
          return offset + 4;
        };
        Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
          value = +value;
          offset = offset | 0;
          if (!noAssert)
            checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
          if (value < 0)
            value = 0xffffffff + value + 1;
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = (value >>> 24);
            this[offset + 1] = (value >>> 16);
            this[offset + 2] = (value >>> 8);
            this[offset + 3] = (value & 0xff);
          } else {
            objectWriteUInt32(this, value, offset, false);
          }
          return offset + 4;
        };
        function checkIEEE754(buf, value, offset, ext, max, min) {
          if (offset + ext > buf.length)
            throw new RangeError('Index out of range');
          if (offset < 0)
            throw new RangeError('Index out of range');
        }
        function writeFloat(buf, value, offset, littleEndian, noAssert) {
          if (!noAssert) {
            checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
          }
          ieee754.write(buf, value, offset, littleEndian, 23, 4);
          return offset + 4;
        }
        Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
          return writeFloat(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
          return writeFloat(this, value, offset, false, noAssert);
        };
        function writeDouble(buf, value, offset, littleEndian, noAssert) {
          if (!noAssert) {
            checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
          }
          ieee754.write(buf, value, offset, littleEndian, 52, 8);
          return offset + 8;
        }
        Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
          return writeDouble(this, value, offset, true, noAssert);
        };
        Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
          return writeDouble(this, value, offset, false, noAssert);
        };
        Buffer.prototype.copy = function copy(target, targetStart, start, end) {
          if (!start)
            start = 0;
          if (!end && end !== 0)
            end = this.length;
          if (targetStart >= target.length)
            targetStart = target.length;
          if (!targetStart)
            targetStart = 0;
          if (end > 0 && end < start)
            end = start;
          if (end === start)
            return 0;
          if (target.length === 0 || this.length === 0)
            return 0;
          if (targetStart < 0) {
            throw new RangeError('targetStart out of bounds');
          }
          if (start < 0 || start >= this.length)
            throw new RangeError('sourceStart out of bounds');
          if (end < 0)
            throw new RangeError('sourceEnd out of bounds');
          if (end > this.length)
            end = this.length;
          if (target.length - targetStart < end - start) {
            end = target.length - targetStart + start;
          }
          var len = end - start;
          var i;
          if (this === target && start < targetStart && targetStart < end) {
            for (i = len - 1; i >= 0; --i) {
              target[i + targetStart] = this[i + start];
            }
          } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
            for (i = 0; i < len; ++i) {
              target[i + targetStart] = this[i + start];
            }
          } else {
            Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
          }
          return len;
        };
        Buffer.prototype.fill = function fill(val, start, end, encoding) {
          if (typeof val === 'string') {
            if (typeof start === 'string') {
              encoding = start;
              start = 0;
              end = this.length;
            } else if (typeof end === 'string') {
              encoding = end;
              end = this.length;
            }
            if (val.length === 1) {
              var code = val.charCodeAt(0);
              if (code < 256) {
                val = code;
              }
            }
            if (encoding !== undefined && typeof encoding !== 'string') {
              throw new TypeError('encoding must be a string');
            }
            if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
              throw new TypeError('Unknown encoding: ' + encoding);
            }
          } else if (typeof val === 'number') {
            val = val & 255;
          }
          if (start < 0 || this.length < start || this.length < end) {
            throw new RangeError('Out of range index');
          }
          if (end <= start) {
            return this;
          }
          start = start >>> 0;
          end = end === undefined ? this.length : end >>> 0;
          if (!val)
            val = 0;
          var i;
          if (typeof val === 'number') {
            for (i = start; i < end; ++i) {
              this[i] = val;
            }
          } else {
            var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
            var len = bytes.length;
            for (i = 0; i < end - start; ++i) {
              this[i + start] = bytes[i % len];
            }
          }
          return this;
        };
        var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
        function base64clean(str) {
          str = stringtrim(str).replace(INVALID_BASE64_RE, '');
          if (str.length < 2)
            return '';
          while (str.length % 4 !== 0) {
            str = str + '=';
          }
          return str;
        }
        function stringtrim(str) {
          if (str.trim)
            return str.trim();
          return str.replace(/^\s+|\s+$/g, '');
        }
        function toHex(n) {
          if (n < 16)
            return '0' + n.toString(16);
          return n.toString(16);
        }
        function utf8ToBytes(string, units) {
          units = units || Infinity;
          var codePoint;
          var length = string.length;
          var leadSurrogate = null;
          var bytes = [];
          for (var i = 0; i < length; ++i) {
            codePoint = string.charCodeAt(i);
            if (codePoint > 0xD7FF && codePoint < 0xE000) {
              if (!leadSurrogate) {
                if (codePoint > 0xDBFF) {
                  if ((units -= 3) > -1)
                    bytes.push(0xEF, 0xBF, 0xBD);
                  continue;
                } else if (i + 1 === length) {
                  if ((units -= 3) > -1)
                    bytes.push(0xEF, 0xBF, 0xBD);
                  continue;
                }
                leadSurrogate = codePoint;
                continue;
              }
              if (codePoint < 0xDC00) {
                if ((units -= 3) > -1)
                  bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
              }
              codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
            } else if (leadSurrogate) {
              if ((units -= 3) > -1)
                bytes.push(0xEF, 0xBF, 0xBD);
            }
            leadSurrogate = null;
            if (codePoint < 0x80) {
              if ((units -= 1) < 0)
                break;
              bytes.push(codePoint);
            } else if (codePoint < 0x800) {
              if ((units -= 2) < 0)
                break;
              bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
            } else if (codePoint < 0x10000) {
              if ((units -= 3) < 0)
                break;
              bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
            } else if (codePoint < 0x110000) {
              if ((units -= 4) < 0)
                break;
              bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
            } else {
              throw new Error('Invalid code point');
            }
          }
          return bytes;
        }
        function asciiToBytes(str) {
          var byteArray = [];
          for (var i = 0; i < str.length; ++i) {
            byteArray.push(str.charCodeAt(i) & 0xFF);
          }
          return byteArray;
        }
        function utf16leToBytes(str, units) {
          var c,
              hi,
              lo;
          var byteArray = [];
          for (var i = 0; i < str.length; ++i) {
            if ((units -= 2) < 0)
              break;
            c = str.charCodeAt(i);
            hi = c >> 8;
            lo = c % 256;
            byteArray.push(lo);
            byteArray.push(hi);
          }
          return byteArray;
        }
        function base64ToBytes(str) {
          return base64.toByteArray(base64clean(str));
        }
        function blitBuffer(src, dst, offset, length) {
          for (var i = 0; i < length; ++i) {
            if ((i + offset >= dst.length) || (i >= src.length))
              break;
            dst[i + offset] = src[i];
          }
          return i;
        }
        function isnan(val) {
          return val !== val;
        }
      }.call(exports, (function() {
        return this;
      }())));
    }, function(module, exports) {
      'use strict';
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
      var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      for (var i = 0,
          len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      revLookup['-'.charCodeAt(0)] = 62;
      revLookup['_'.charCodeAt(0)] = 63;
      function placeHoldersCount(b64) {
        var len = b64.length;
        if (len % 4 > 0) {
          throw new Error('Invalid string. Length must be a multiple of 4');
        }
        return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
      }
      function byteLength(b64) {
        return b64.length * 3 / 4 - placeHoldersCount(b64);
      }
      function toByteArray(b64) {
        var i,
            j,
            l,
            tmp,
            placeHolders,
            arr;
        var len = b64.length;
        placeHolders = placeHoldersCount(b64);
        arr = new Arr(len * 3 / 4 - placeHolders);
        l = placeHolders > 0 ? len - 4 : len;
        var L = 0;
        for (i = 0, j = 0; i < l; i += 4, j += 3) {
          tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
          arr[L++] = (tmp >> 16) & 0xFF;
          arr[L++] = (tmp >> 8) & 0xFF;
          arr[L++] = tmp & 0xFF;
        }
        if (placeHolders === 2) {
          tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
          arr[L++] = tmp & 0xFF;
        } else if (placeHolders === 1) {
          tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
          arr[L++] = (tmp >> 8) & 0xFF;
          arr[L++] = tmp & 0xFF;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i = start; i < end; i += 3) {
          tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
          output.push(tripletToBase64(tmp));
        }
        return output.join('');
      }
      function fromByteArray(uint8) {
        var tmp;
        var len = uint8.length;
        var extraBytes = len % 3;
        var output = '';
        var parts = [];
        var maxChunkLength = 16383;
        for (var i = 0,
            len2 = len - extraBytes; i < len2; i += maxChunkLength) {
          parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
        }
        if (extraBytes === 1) {
          tmp = uint8[len - 1];
          output += lookup[tmp >> 2];
          output += lookup[(tmp << 4) & 0x3F];
          output += '==';
        } else if (extraBytes === 2) {
          tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
          output += lookup[tmp >> 10];
          output += lookup[(tmp >> 4) & 0x3F];
          output += lookup[(tmp << 2) & 0x3F];
          output += '=';
        }
        parts.push(output);
        return parts.join('');
      }
    }, function(module, exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e,
            m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? (nBytes - 1) : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & ((1 << (-nBits)) - 1);
        s >>= (-nBits);
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
        m = e & ((1 << (-nBits)) - 1);
        e >>= (-nBits);
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : ((s ? -1 : 1) * Infinity);
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e,
            m,
            c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
        var i = isLE ? 0 : (nBytes - 1);
        var d = isLE ? 1 : -1;
        var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
        e = (e << mLen) | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
        buffer[offset + i - d] |= s * 128;
      };
    }, function(module, exports) {
      var toString = {}.toString;
      module.exports = Array.isArray || function(arr) {
        return toString.call(arr) == '[object Array]';
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function bind(fn, thisArg) {
        return function wrap() {
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          return fn.apply(thisArg, args);
        };
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var defaults = __webpack_require__(9);
      var utils = __webpack_require__(2);
      var InterceptorManager = __webpack_require__(20);
      var dispatchRequest = __webpack_require__(21);
      var isAbsoluteURL = __webpack_require__(24);
      var combineURLs = __webpack_require__(25);
      function Axios(instanceConfig) {
        this.defaults = instanceConfig;
        this.interceptors = {
          request: new InterceptorManager(),
          response: new InterceptorManager()
        };
      }
      Axios.prototype.request = function request(config) {
        if (typeof config === 'string') {
          config = utils.merge({url: arguments[0]}, arguments[1]);
        }
        config = utils.merge(defaults, this.defaults, {method: 'get'}, config);
        if (config.baseURL && !isAbsoluteURL(config.url)) {
          config.url = combineURLs(config.baseURL, config.url);
        }
        var chain = [dispatchRequest, undefined];
        var promise = Promise.resolve(config);
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
          chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
          chain.push(interceptor.fulfilled, interceptor.rejected);
        });
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      };
      utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
        Axios.prototype[method] = function(url, config) {
          return this.request(utils.merge(config || {}, {
            method: method,
            url: url
          }));
        };
      });
      utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
        Axios.prototype[method] = function(url, data, config) {
          return this.request(utils.merge(config || {}, {
            method: method,
            url: url,
            data: data
          }));
        };
      });
      module.exports = Axios;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var normalizeHeaderName = __webpack_require__(10);
      var DEFAULT_CONTENT_TYPE = {'Content-Type': 'application/x-www-form-urlencoded'};
      function setContentTypeIfUnset(headers, value) {
        if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
          headers['Content-Type'] = value;
        }
      }
      function getDefaultAdapter() {
        var adapter;
        if (typeof XMLHttpRequest !== 'undefined') {
          adapter = __webpack_require__(11);
        } else if (typeof process !== 'undefined') {
          adapter = __webpack_require__(11);
        }
        return adapter;
      }
      var defaults = {
        adapter: getDefaultAdapter(),
        transformRequest: [function transformRequest(data, headers) {
          normalizeHeaderName(headers, 'Content-Type');
          if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
            return data;
          }
          if (utils.isArrayBufferView(data)) {
            return data.buffer;
          }
          if (utils.isURLSearchParams(data)) {
            setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
            return data.toString();
          }
          if (utils.isObject(data)) {
            setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
            return JSON.stringify(data);
          }
          return data;
        }],
        transformResponse: [function transformResponse(data) {
          if (typeof data === 'string') {
            try {
              data = JSON.parse(data);
            } catch (e) {}
          }
          return data;
        }],
        timeout: 0,
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        maxContentLength: -1,
        validateStatus: function validateStatus(status) {
          return status >= 200 && status < 300;
        }
      };
      defaults.headers = {common: {'Accept': 'application/json, text/plain, */*'}};
      utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
        defaults.headers[method] = {};
      });
      utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
        defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
      });
      module.exports = defaults;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = function normalizeHeaderName(headers, normalizedName) {
        utils.forEach(headers, function processHeader(value, name) {
          if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
          }
        });
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var settle = __webpack_require__(12);
      var buildURL = __webpack_require__(15);
      var parseHeaders = __webpack_require__(16);
      var isURLSameOrigin = __webpack_require__(17);
      var createError = __webpack_require__(13);
      var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(18);
      module.exports = function xhrAdapter(config) {
        return new Promise(function dispatchXhrRequest(resolve, reject) {
          var requestData = config.data;
          var requestHeaders = config.headers;
          if (utils.isFormData(requestData)) {
            delete requestHeaders['Content-Type'];
          }
          var request = new XMLHttpRequest();
          var loadEvent = 'onreadystatechange';
          var xDomain = false;
          if (("production") !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
            request = new window.XDomainRequest();
            loadEvent = 'onload';
            xDomain = true;
            request.onprogress = function handleProgress() {};
            request.ontimeout = function handleTimeout() {};
          }
          if (config.auth) {
            var username = config.auth.username || '';
            var password = config.auth.password || '';
            requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
          }
          request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
          request.timeout = config.timeout;
          request[loadEvent] = function handleLoad() {
            if (!request || (request.readyState !== 4 && !xDomain)) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
              return;
            }
            var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
            var response = {
              data: responseData,
              status: request.status === 1223 ? 204 : request.status,
              statusText: request.status === 1223 ? 'No Content' : request.statusText,
              headers: responseHeaders,
              config: config,
              request: request
            };
            settle(resolve, reject, response);
            request = null;
          };
          request.onerror = function handleError() {
            reject(createError('Network Error', config));
            request = null;
          };
          request.ontimeout = function handleTimeout() {
            reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));
            request = null;
          };
          if (utils.isStandardBrowserEnv()) {
            var cookies = __webpack_require__(19);
            var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
            if (xsrfValue) {
              requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }
          }
          if ('setRequestHeader' in request) {
            utils.forEach(requestHeaders, function setRequestHeader(val, key) {
              if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
                delete requestHeaders[key];
              } else {
                request.setRequestHeader(key, val);
              }
            });
          }
          if (config.withCredentials) {
            request.withCredentials = true;
          }
          if (config.responseType) {
            try {
              request.responseType = config.responseType;
            } catch (e) {
              if (config.responseType !== 'json') {
                throw e;
              }
            }
          }
          if (typeof config.onDownloadProgress === 'function') {
            request.addEventListener('progress', config.onDownloadProgress);
          }
          if (typeof config.onUploadProgress === 'function' && request.upload) {
            request.upload.addEventListener('progress', config.onUploadProgress);
          }
          if (config.cancelToken) {
            config.cancelToken.promise.then(function onCanceled(cancel) {
              if (!request) {
                return;
              }
              request.abort();
              reject(cancel);
              request = null;
            });
          }
          if (requestData === undefined) {
            requestData = null;
          }
          request.send(requestData);
        });
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var createError = __webpack_require__(13);
      module.exports = function settle(resolve, reject, response) {
        var validateStatus = response.config.validateStatus;
        if (!response.status || !validateStatus || validateStatus(response.status)) {
          resolve(response);
        } else {
          reject(createError('Request failed with status code ' + response.status, response.config, null, response));
        }
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var enhanceError = __webpack_require__(14);
      module.exports = function createError(message, config, code, response) {
        var error = new Error(message);
        return enhanceError(error, config, code, response);
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function enhanceError(error, config, code, response) {
        error.config = config;
        if (code) {
          error.code = code;
        }
        error.response = response;
        return error;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      function encode(val) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
      }
      module.exports = function buildURL(url, params, paramsSerializer) {
        if (!params) {
          return url;
        }
        var serializedParams;
        if (paramsSerializer) {
          serializedParams = paramsSerializer(params);
        } else if (utils.isURLSearchParams(params)) {
          serializedParams = params.toString();
        } else {
          var parts = [];
          utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === 'undefined') {
              return;
            }
            if (utils.isArray(val)) {
              key = key + '[]';
            }
            if (!utils.isArray(val)) {
              val = [val];
            }
            utils.forEach(val, function parseValue(v) {
              if (utils.isDate(v)) {
                v = v.toISOString();
              } else if (utils.isObject(v)) {
                v = JSON.stringify(v);
              }
              parts.push(encode(key) + '=' + encode(v));
            });
          });
          serializedParams = parts.join('&');
        }
        if (serializedParams) {
          url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
        }
        return url;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = function parseHeaders(headers) {
        var parsed = {};
        var key;
        var val;
        var i;
        if (!headers) {
          return parsed;
        }
        utils.forEach(headers.split('\n'), function parser(line) {
          i = line.indexOf(':');
          key = utils.trim(line.substr(0, i)).toLowerCase();
          val = utils.trim(line.substr(i + 1));
          if (key) {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        });
        return parsed;
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = (utils.isStandardBrowserEnv() ? (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;
        function resolveURL(url) {
          var href = url;
          if (msie) {
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }
          urlParsingNode.setAttribute('href', href);
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
          };
        }
        originURL = resolveURL(window.location.href);
        return function isURLSameOrigin(requestURL) {
          var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol && parsed.host === originURL.host);
        };
      })() : (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })());
    }, function(module, exports) {
      'use strict';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      function E() {
        this.message = 'String contains an invalid character';
      }
      E.prototype = new Error;
      E.prototype.code = 5;
      E.prototype.name = 'InvalidCharacterError';
      function btoa(input) {
        var str = String(input);
        var output = '';
        for (var block,
            charCode,
            idx = 0,
            map = chars; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
          charCode = str.charCodeAt(idx += 3 / 4);
          if (charCode > 0xFF) {
            throw new E();
          }
          block = block << 8 | charCode;
        }
        return output;
      }
      module.exports = btoa;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = (utils.isStandardBrowserEnv() ? (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }
            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }
            if (secure === true) {
              cookie.push('secure');
            }
            document.cookie = cookie.join('; ');
          },
          read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },
          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() : (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() {
            return null;
          },
          remove: function remove() {}
        };
      })());
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      function InterceptorManager() {
        this.handlers = [];
      }
      InterceptorManager.prototype.use = function use(fulfilled, rejected) {
        this.handlers.push({
          fulfilled: fulfilled,
          rejected: rejected
        });
        return this.handlers.length - 1;
      };
      InterceptorManager.prototype.eject = function eject(id) {
        if (this.handlers[id]) {
          this.handlers[id] = null;
        }
      };
      InterceptorManager.prototype.forEach = function forEach(fn) {
        utils.forEach(this.handlers, function forEachHandler(h) {
          if (h !== null) {
            fn(h);
          }
        });
      };
      module.exports = InterceptorManager;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      var transformData = __webpack_require__(22);
      var isCancel = __webpack_require__(23);
      var defaults = __webpack_require__(9);
      function throwIfCancellationRequested(config) {
        if (config.cancelToken) {
          config.cancelToken.throwIfRequested();
        }
      }
      module.exports = function dispatchRequest(config) {
        throwIfCancellationRequested(config);
        config.headers = config.headers || {};
        config.data = transformData(config.data, config.headers, config.transformRequest);
        config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});
        utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
          delete config.headers[method];
        });
        var adapter = config.adapter || defaults.adapter;
        return adapter(config).then(function onAdapterResolution(response) {
          throwIfCancellationRequested(config);
          response.data = transformData(response.data, response.headers, config.transformResponse);
          return response;
        }, function onAdapterRejection(reason) {
          if (!isCancel(reason)) {
            throwIfCancellationRequested(config);
            if (reason && reason.response) {
              reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
            }
          }
          return Promise.reject(reason);
        });
      };
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var utils = __webpack_require__(2);
      module.exports = function transformData(data, headers, fns) {
        utils.forEach(fns, function transform(fn) {
          data = fn(data, headers);
        });
        return data;
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function isCancel(value) {
        return !!(value && value.__CANCEL__);
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function isAbsoluteURL(url) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
      };
    }, function(module, exports) {
      'use strict';
      module.exports = function combineURLs(baseURL, relativeURL) {
        return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
      };
    }, function(module, exports) {
      'use strict';
      function Cancel(message) {
        this.message = message;
      }
      Cancel.prototype.toString = function toString() {
        return 'Cancel' + (this.message ? ': ' + this.message : '');
      };
      Cancel.prototype.__CANCEL__ = true;
      module.exports = Cancel;
    }, function(module, exports, __webpack_require__) {
      'use strict';
      var Cancel = __webpack_require__(26);
      function CancelToken(executor) {
        if (typeof executor !== 'function') {
          throw new TypeError('executor must be a function.');
        }
        var resolvePromise;
        this.promise = new Promise(function promiseExecutor(resolve) {
          resolvePromise = resolve;
        });
        var token = this;
        executor(function cancel(message) {
          if (token.reason) {
            return;
          }
          token.reason = new Cancel(message);
          resolvePromise(token.reason);
        });
      }
      CancelToken.prototype.throwIfRequested = function throwIfRequested() {
        if (this.reason) {
          throw this.reason;
        }
      };
      CancelToken.source = function source() {
        var cancel;
        var token = new CancelToken(function executor(c) {
          cancel = c;
        });
        return {
          token: token,
          cancel: cancel
        };
      };
      module.exports = CancelToken;
    }, function(module, exports) {
      'use strict';
      module.exports = function spread(callback) {
        return function wrap(arr) {
          return callback.apply(null, arr);
        };
      };
    }]);
  });
  ;
})(require('buffer').Buffer, require('process'));
