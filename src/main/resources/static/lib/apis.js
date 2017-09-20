import Vue from 'vue/dist/vue'

import './apis.css!css'
import template from './apis.html!text'

import DemoAPIs from './demo/index'
import CoreAPIs from './core/index'
import AppAPIs from './app/index'

export default Vue.component('APIs', {
  components: { DemoAPIs, CoreAPIs, AppAPIs },
  template
})
