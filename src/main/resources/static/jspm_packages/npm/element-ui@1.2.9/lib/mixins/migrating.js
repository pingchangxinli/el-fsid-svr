/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  exports.default = {
    mounted: function mounted() {
      if (process.env.NODE_ENV === 'production')
        return;
      if (!this.$vnode)
        return;
      var _getMigratingConfig = this.getMigratingConfig(),
          props = _getMigratingConfig.props,
          events = _getMigratingConfig.events;
      var _$vnode = this.$vnode,
          data = _$vnode.data,
          componentOptions = _$vnode.componentOptions;
      var definedProps = data.attrs || {};
      var definedEvents = componentOptions.listeners || {};
      for (var propName in definedProps) {
        if (definedProps.hasOwnProperty(propName) && props[propName]) {
          console.warn('[Element Migrating][Attribute]: ' + props[propName]);
        }
      }
      for (var eventName in definedEvents) {
        if (definedEvents.hasOwnProperty(eventName) && events[eventName]) {
          console.warn('[Element Migrating][Event]: ' + events[eventName]);
        }
      }
    },
    methods: {getMigratingConfig: function getMigratingConfig() {
        return {
          props: {},
          events: {}
        };
      }}
  };
})(require('process'));
