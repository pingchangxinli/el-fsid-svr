import Vue from 'vue/dist/vue'

import template from './index.html!text'

import Hello from './hello'
import World from './world'
import DemoDp from './demo_dp'
import DemoTx from './demo_tx'
import DemoFm from './demo_fm'
import DemoPm from './demo_pm'
import DemoUdc from './demo_udc'

const components = {
  Hello,
  World,
  DemoDp,
  DemoTx,
  DemoFm,
  DemoPm,
  DemoUdc,
}

export default Vue.component('DemoAPIs', {
  components,
  template,
})
