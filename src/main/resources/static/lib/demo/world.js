import Vue from 'vue/dist/vue'

import template from './world.html!text'

export default Vue.component('Hello', {
  template,
  props: [ 'message' ],
  data () {
    return {
      input: this.message
    }
  }
})
