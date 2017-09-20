/* */ 
(function(process) {
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
      module.exports = __webpack_require__(285);
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
    285: function(module, exports, __webpack_require__) {
      'use strict';
      exports.__esModule = true;
      var _steps = __webpack_require__(286);
      var _steps2 = _interopRequireDefault(_steps);
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {default: obj};
      }
      _steps2.default.install = function(Vue) {
        Vue.component(_steps2.default.name, _steps2.default);
      };
      exports.default = _steps2.default;
    },
    286: function(module, exports, __webpack_require__) {
      var Component = __webpack_require__(3)(__webpack_require__(287), __webpack_require__(288), null, null);
      module.exports = Component.exports;
    },
    287: function(module, exports) {
      'use strict';
      exports.__esModule = true;
      exports.default = {
        name: 'ElSteps',
        props: {
          space: [Number, String],
          active: Number,
          direction: {
            type: String,
            default: 'horizontal'
          },
          alignCenter: Boolean,
          center: Boolean,
          finishStatus: {
            type: String,
            default: 'finish'
          },
          processStatus: {
            type: String,
            default: 'process'
          }
        },
        data: function data() {
          return {
            steps: [],
            stepOffset: 0
          };
        },
        watch: {
          active: function active(newVal, oldVal) {
            this.$emit('change', newVal, oldVal);
          },
          steps: function steps(_steps) {
            _steps.forEach(function(child, index) {
              child.index = index;
            });
          }
        }
      };
    },
    288: function(module, exports) {
      module.exports = {
        render: function() {
          var _vm = this;
          var _h = _vm.$createElement;
          var _c = _vm._self._c || _h;
          return _c('div', {
            staticClass: "el-steps",
            class: ['is-' + _vm.direction, _vm.center ? 'is-center' : '']
          }, [_vm._t("default")], 2);
        },
        staticRenderFns: []
      };
    }
  });
})(require('process'));
