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
    module.exports = __webpack_require__(63);
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
  63: function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _checkbox = __webpack_require__(64);
    var _checkbox2 = _interopRequireDefault(_checkbox);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    _checkbox2.default.install = function(Vue) {
      Vue.component(_checkbox2.default.name, _checkbox2.default);
    };
    exports.default = _checkbox2.default;
  },
  64: function(module, exports, __webpack_require__) {
    var Component = __webpack_require__(3)(__webpack_require__(65), __webpack_require__(66), null, null);
    module.exports = Component.exports;
  },
  65: function(module, exports, __webpack_require__) {
    'use strict';
    exports.__esModule = true;
    var _emitter = __webpack_require__(14);
    var _emitter2 = _interopRequireDefault(_emitter);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    exports.default = {
      name: 'ElCheckbox',
      mixins: [_emitter2.default],
      componentName: 'ElCheckbox',
      data: function data() {
        return {
          selfModel: false,
          focus: false
        };
      },
      computed: {
        model: {
          get: function get() {
            return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel;
          },
          set: function set(val) {
            if (this.isGroup) {
              var isLimitExceeded = false;
              this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (isLimitExceeded = true);
              this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (isLimitExceeded = true);
              isLimitExceeded === false && this.dispatch('ElCheckboxGroup', 'input', [val]);
            } else if (this.value !== undefined) {
              this.$emit('input', val);
            } else {
              this.selfModel = val;
            }
          }
        },
        isChecked: function isChecked() {
          if ({}.toString.call(this.model) === '[object Boolean]') {
            return this.model;
          } else if (Array.isArray(this.model)) {
            return this.model.indexOf(this.label) > -1;
          } else if (this.model !== null && this.model !== undefined) {
            return this.model === this.trueLabel;
          }
        },
        isGroup: function isGroup() {
          var parent = this.$parent;
          while (parent) {
            if (parent.$options.componentName !== 'ElCheckboxGroup') {
              parent = parent.$parent;
            } else {
              this._checkboxGroup = parent;
              return true;
            }
          }
          return false;
        },
        store: function store() {
          return this._checkboxGroup ? this._checkboxGroup.value : this.value;
        }
      },
      props: {
        value: {},
        label: {},
        indeterminate: Boolean,
        disabled: Boolean,
        checked: Boolean,
        name: String,
        trueLabel: [String, Number],
        falseLabel: [String, Number]
      },
      methods: {
        addToStore: function addToStore() {
          if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
            this.model.push(this.label);
          } else {
            this.model = this.trueLabel || true;
          }
        },
        handleChange: function handleChange(ev) {
          var _this = this;
          this.$emit('change', ev);
          if (this.isGroup) {
            this.$nextTick(function(_) {
              _this.dispatch('ElCheckboxGroup', 'change', [_this._checkboxGroup.value]);
            });
          }
        }
      },
      created: function created() {
        this.checked && this.addToStore();
      }
    };
  },
  66: function(module, exports) {
    module.exports = {
      render: function() {
        var _vm = this;
        var _h = _vm.$createElement;
        var _c = _vm._self._c || _h;
        return _c('label', {staticClass: "el-checkbox"}, [_c('span', {
          staticClass: "el-checkbox__input",
          class: {
            'is-disabled': _vm.disabled,
            'is-checked': _vm.isChecked,
            'is-indeterminate': _vm.indeterminate,
            'is-focus': _vm.focus
          }
        }, [_c('span', {staticClass: "el-checkbox__inner"}), (_vm.trueLabel || _vm.falseLabel) ? _c('input', {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: (_vm.model),
            expression: "model"
          }],
          staticClass: "el-checkbox__original",
          attrs: {
            "type": "checkbox",
            "name": _vm.name,
            "disabled": _vm.disabled,
            "true-value": _vm.trueLabel,
            "false-value": _vm.falseLabel
          },
          domProps: {"checked": Array.isArray(_vm.model) ? _vm._i(_vm.model, null) > -1 : _vm._q(_vm.model, _vm.trueLabel)},
          on: {
            "change": [function($event) {
              var $$a = _vm.model,
                  $$el = $event.target,
                  $$c = $$el.checked ? (_vm.trueLabel) : (_vm.falseLabel);
              if (Array.isArray($$a)) {
                var $$v = null,
                    $$i = _vm._i($$a, $$v);
                if ($$c) {
                  $$i < 0 && (_vm.model = $$a.concat($$v));
                } else {
                  $$i > -1 && (_vm.model = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                }
              } else {
                _vm.model = $$c;
              }
            }, _vm.handleChange],
            "focus": function($event) {
              _vm.focus = true;
            },
            "blur": function($event) {
              _vm.focus = false;
            }
          }
        }) : _c('input', {
          directives: [{
            name: "model",
            rawName: "v-model",
            value: (_vm.model),
            expression: "model"
          }],
          staticClass: "el-checkbox__original",
          attrs: {
            "type": "checkbox",
            "disabled": _vm.disabled,
            "name": _vm.name
          },
          domProps: {
            "value": _vm.label,
            "checked": Array.isArray(_vm.model) ? _vm._i(_vm.model, _vm.label) > -1 : (_vm.model)
          },
          on: {
            "change": [function($event) {
              var $$a = _vm.model,
                  $$el = $event.target,
                  $$c = $$el.checked ? (true) : (false);
              if (Array.isArray($$a)) {
                var $$v = _vm.label,
                    $$i = _vm._i($$a, $$v);
                if ($$c) {
                  $$i < 0 && (_vm.model = $$a.concat($$v));
                } else {
                  $$i > -1 && (_vm.model = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                }
              } else {
                _vm.model = $$c;
              }
            }, _vm.handleChange],
            "focus": function($event) {
              _vm.focus = true;
            },
            "blur": function($event) {
              _vm.focus = false;
            }
          }
        })]), (_vm.$slots.default || _vm.label) ? _c('span', {staticClass: "el-checkbox__label"}, [_vm._t("default"), (!_vm.$slots.default) ? [_vm._v(_vm._s(_vm.label))] : _vm._e()], 2) : _vm._e()]);
      },
      staticRenderFns: []
    };
  }
});
