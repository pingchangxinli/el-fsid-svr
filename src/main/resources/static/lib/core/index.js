import Vue from 'vue/dist/vue'

import template from './index.html!text'

import Login from './login'

const components = {
  Login,
}

export default Vue.component('CoreAPIs', {
  components,
  template,
})
