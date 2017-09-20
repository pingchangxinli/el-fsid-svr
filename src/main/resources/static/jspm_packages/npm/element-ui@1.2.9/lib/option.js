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
    module.exports = __webpack_require__(210);
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
  210: function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _option = __webpack_require__(211);
    var _option2 = _interopRequireDefault(_option);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    _option2.default.install = function(Vue) {
      Vue.component(_option2.default.name, _option2.default);
    };
    exports.default = _option2.default;
  },
  211: function(module, exports, __webpack_require__) {
    var Component = __webpack_require__(3)(__webpack_require__(212), __webpack_require__(213), null, null);
    module.exports = Component.exports;
  },
  212: function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _emitter = __webpack_require__(14);
    var _emitter2 = _interopRequireDefault(_emitter);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    exports.default = {
      mixins: [_emitter2.default],
      name: 'ElOption',
      componentName: 'ElOption',
      props: {
        value: {required: true},
        label: [String, Number],
        created: Boolean,
        disabled: {
          type: Boolean,
          default: false
        }
      },
      data: function data() {
        return {
          index: -1,
          groupDisabled: false,
          visible: true,
          hitState: false
        };
      },
      computed: {
        currentLabel: function currentLabel() {
          return this.label || (typeof this.value === 'string' || typeof this.value === 'number' ? this.value : '');
        },
        currentValue: function currentValue() {
          return this.value || this.label || '';
        },
        parent: function parent() {
          var result = this.$parent;
          while (!result.isSelect) {
            result = result.$parent;
          }
          return result;
        },
        itemSelected: function itemSelected() {
          if (!this.parent.multiple) {
            return this.value === this.parent.value;
          } else {
            return this.parent.value.indexOf(this.value) > -1;
          }
        },
        limitReached: function limitReached() {
          if (this.parent.multiple) {
            return !this.itemSelected && this.parent.value.length >= this.parent.multipleLimit && this.parent.multipleLimit > 0;
          } else {
            return false;
          }
        }
      },
      watch: {
        currentLabel: function currentLabel() {
          if (!this.created && !this.parent.remote)
            this.dispatch('ElSelect', 'setSelected');
        },
        value: function value() {
          if (!this.created && !this.parent.remote)
            this.dispatch('ElSelect', 'setSelected');
        }
      },
      methods: {
        handleGroupDisabled: function handleGroupDisabled(val) {
          this.groupDisabled = val;
        },
        hoverItem: function hoverItem() {
          if (!this.disabled && !this.groupDisabled) {
            this.parent.hoverIndex = this.parent.options.indexOf(this);
          }
        },
        selectOptionClick: function selectOptionClick() {
          if (this.disabled !== true && this.groupDisabled !== true) {
            this.dispatch('ElSelect', 'handleOptionClick', this);
          }
        },
        queryChange: function queryChange(query) {
          var parsedQuery = String(query).replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
          this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel) || this.created;
          if (!this.visible) {
            this.parent.filteredOptionsCount--;
          }
        },
        resetIndex: function resetIndex() {
          var _this = this;
          this.$nextTick(function() {
            _this.index = _this.parent.options.indexOf(_this);
          });
        }
      },
      created: function created() {
        this.parent.options.push(this);
        this.parent.cachedOptions.push(this);
        this.parent.optionsCount++;
        this.parent.filteredOptionsCount++;
        this.index = this.parent.options.indexOf(this);
        this.$on('queryChange', this.queryChange);
        this.$on('handleGroupDisabled', this.handleGroupDisabled);
        this.$on('resetIndex', this.resetIndex);
      },
      beforeDestroy: function beforeDestroy() {
        this.dispatch('ElSelect', 'onOptionDestroy', this);
      }
    };
  },
  213: function(module, exports) {
    module.exports = {
      render: function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c('li', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: (_vm.visible),
            expression: "visible"
          }],
          staticClass: "el-select-dropdown__item",
          class: {
            'selected': _vm.itemSelected,
            'is-disabled': _vm.disabled || _vm.groupDisabled || _vm.limitReached,
            'hover': _vm.parent.hoverIndex === _vm.index
          },
          on: {
            "mouseenter": _vm.hoverItem,
            "click": function($event) {
              $event.stopPropagation();
              _vm.selectOptionClick($event);
            }
          }
        }, [_vm._t("default", [_c('span', [_vm._v(_vm._s(_vm.currentLabel))])])], 2);
      },
      staticRenderFns: []
    };
  }
});
