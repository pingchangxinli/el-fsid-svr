/* */ 
'use strict';
exports.__esModule = true;
var _vue = require('vue');
var _vue2 = _interopRequireDefault(_vue);
var _popup = require('./popup/index');
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var PopperJS = _vue2.default.prototype.$isServer ? function() {} : require('./popper');
var stop = function stop(e) {
  return e.stopPropagation();
};
exports.default = {
  props: {
    placement: {
      type: String,
      default: 'bottom'
    },
    boundariesPadding: {
      type: Number,
      default: 5
    },
    reference: {},
    popper: {},
    offset: {default: 0},
    value: Boolean,
    visibleArrow: Boolean,
    transition: String,
    appendToBody: {
      type: Boolean,
      default: true
    },
    popperOptions: {
      type: Object,
      default: function _default() {
        return {gpuAcceleration: false};
      }
    }
  },
  data: function data() {
    return {
      showPopper: false,
      currentPlacement: ''
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler(val) {
        this.showPopper = val;
        this.$emit('input', val);
      }
    },
    showPopper: function showPopper(val) {
      val ? this.updatePopper() : this.destroyPopper();
      this.$emit('input', val);
    }
  },
  methods: {
    createPopper: function createPopper() {
      var _this = this;
      if (this.$isServer)
        return;
      this.currentPlacement = this.currentPlacement || this.placement;
      if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.currentPlacement)) {
        return;
      }
      var options = this.popperOptions;
      var popper = this.popperElm = this.popperElm || this.popper || this.$refs.popper;
      var reference = this.referenceElm = this.referenceElm || this.reference || this.$refs.reference;
      if (!reference && this.$slots.reference && this.$slots.reference[0]) {
        reference = this.referenceElm = this.$slots.reference[0].elm;
      }
      if (!popper || !reference)
        return;
      if (this.visibleArrow)
        this.appendArrow(popper);
      if (this.appendToBody)
        document.body.appendChild(this.popperElm);
      if (this.popperJS && this.popperJS.destroy) {
        this.popperJS.destroy();
      }
      options.placement = this.currentPlacement;
      options.offset = this.offset;
      this.popperJS = new PopperJS(reference, popper, options);
      this.popperJS.onCreate(function(_) {
        _this.$emit('created', _this);
        _this.resetTransformOrigin();
        _this.$nextTick(_this.updatePopper);
      });
      if (typeof options.onUpdate === 'function') {
        this.popperJS.onUpdate(options.onUpdate);
      }
      this.popperJS._popper.style.zIndex = _popup.PopupManager.nextZIndex();
      this.popperElm.addEventListener('click', stop);
    },
    updatePopper: function updatePopper() {
      this.popperJS ? this.popperJS.update() : this.createPopper();
    },
    doDestroy: function doDestroy() {
      if (this.showPopper || !this.popperJS)
        return;
      this.popperJS.destroy();
      this.popperJS = null;
    },
    destroyPopper: function destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },
    resetTransformOrigin: function resetTransformOrigin() {
      var placementMap = {
        top: 'bottom',
        bottom: 'top',
        left: 'right',
        right: 'left'
      };
      var placement = this.popperJS._popper.getAttribute('x-placement').split('-')[0];
      var origin = placementMap[placement];
      this.popperJS._popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? 'center ' + origin : origin + ' center';
    },
    appendArrow: function appendArrow(element) {
      var hash = void 0;
      if (this.appended) {
        return;
      }
      this.appended = true;
      for (var item in element.attributes) {
        if (/^_v-/.test(element.attributes[item].name)) {
          hash = element.attributes[item].name;
          break;
        }
      }
      var arrow = document.createElement('div');
      if (hash) {
        arrow.setAttribute(hash, '');
      }
      arrow.setAttribute('x-arrow', '');
      arrow.className = 'popper__arrow';
      element.appendChild(arrow);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.doDestroy();
    if (this.popperElm && this.popperElm.parentNode === document.body) {
      this.popperElm.removeEventListener('click', stop);
      document.body.removeChild(this.popperElm);
    }
  },
  deactivated: function deactivated() {
    this.$options.beforeDestroy[0].call(this);
  }
};