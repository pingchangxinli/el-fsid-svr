/* */ 
module.exports = (function(modules) {
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
  __webpack_require__.p = "/dist/";
  return __webpack_require__(0);
})({
  0: function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(67);
  },
  3: function(module, exports) {
    module.exports = function normalizeComponent(rawScriptExports, compiledTemplate, scopeId, cssModules) {
      var esModule;
      var scriptExports = rawScriptExports = rawScriptExports || {};
      var type = typeof rawScriptExports.default;
      if (type === 'object' || type === 'function') {
        esModule = rawScriptExports;
        scriptExports = rawScriptExports.default;
      }
      var options = typeof scriptExports === 'function' ? scriptExports.options : scriptExports;
      if (compiledTemplate) {
        options.render = compiledTemplate.render;
        options.staticRenderFns = compiledTemplate.staticRenderFns;
      }
      if (scopeId) {
        options._scopeId = scopeId;
      }
      if (cssModules) {
        var computed = options.computed || (options.computed = {});
        Object.keys(cssModules).forEach(function(key) {
          var module = cssModules[key];
          computed[key] = function() {
            return module;
          };
        });
      }
      return {
        esModule: esModule,
        exports: scriptExports,
        options: options
      };
    };
  },
  14: function(module, exports) {
    module.exports = require('./mixins/emitter');
  },
  67: function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _checkboxGroup = __webpack_require__(68);
    var _checkboxGroup2 = _interopRequireDefault(_checkboxGroup);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    _checkboxGroup2.default.install = function(Vue) {
      Vue.component(_checkboxGroup2.default.name, _checkboxGroup2.default);
    };
    exports.default = _checkboxGroup2.default;
  },
  68: function(module, exports, __webpack_require__) {
    var Component = __webpack_require__(3)(__webpack_require__(69), __webpack_require__(70), null, null);
    module.exports = Component.exports;
  },
  69: function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _emitter = __webpack_require__(14);
    var _emitter2 = _interopRequireDefault(_emitter);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    exports.default = {
      name: 'ElCheckboxGroup',
      componentName: 'ElCheckboxGroup',
      mixins: [_emitter2.default],
      props: {
        value: {},
        min: Number,
        max: Number
      },
      watch: {value: function value(_value) {
          this.dispatch('ElFormItem', 'el.form.change', [_value]);
        }}
    };
  },
  70: function(module, exports) {
    module.exports = {
      render: function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c('div', {staticClass: "el-checkbox-group"}, [_vm._t("default")], 2);
      },
      staticRenderFns: []
    };
  }
});
