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
    module.exports = __webpack_require__(143);
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
  13: function(module, exports) {
    module.exports = require('./utils/vue-popper');
  },
  143: function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _dropdownMenu = __webpack_require__(144);
    var _dropdownMenu2 = _interopRequireDefault(_dropdownMenu);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    _dropdownMenu2.default.install = function(Vue) {
      Vue.component(_dropdownMenu2.default.name, _dropdownMenu2.default);
    };
    exports.default = _dropdownMenu2.default;
  },
  144: function(module, exports, __webpack_require__) {
    var Component = __webpack_require__(3)(__webpack_require__(145), __webpack_require__(146), null, null);
    module.exports = Component.exports;
  },
  145: function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _vuePopper = __webpack_require__(13);
    var _vuePopper2 = _interopRequireDefault(_vuePopper);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    exports.default = {
      name: 'ElDropdownMenu',
      componentName: 'ElDropdownMenu',
      mixins: [_vuePopper2.default],
      created: function created() {
        var _this = this;
        this.$on('updatePopper', this.updatePopper);
        this.$on('visible', function(val) {
          _this.showPopper = val;
        });
      },
      mounted: function mounted() {
        this.$parent.popperElm = this.popperElm = this.$el;
        this.referenceElm = this.$parent.$el;
      },
      watch: {'$parent.menuAlign': {
          immediate: true,
          handler: function handler(val) {
            this.currentPlacement = 'bottom-' + val;
          }
        }}
    };
  },
  146: function(module, exports) {
    module.exports = {
      render: function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c('transition', {
          attrs: {"name": "el-zoom-in-top"},
          on: {"after-leave": _vm.doDestroy}
        }, [_c('ul', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: (_vm.showPopper),
            expression: "showPopper"
          }],
          staticClass: "el-dropdown-menu"
        }, [_vm._t("default")], 2)]);
      },
      staticRenderFns: []
    };
  }
});
