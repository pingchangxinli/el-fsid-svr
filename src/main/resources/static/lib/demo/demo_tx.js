import EL from 'el'
import Vue from 'vue/dist/vue'
import template from './demo_tx.html!text'

import ApiHeader from '../core/api_header'
import DecInput from '../core/dec_input'

export default Vue.component('DemoTx', {
  components: { ApiHeader, DecInput },
  template,
  data: function () {
    return {
      form: {
        subject: 'A Vue.js Course',
        content: 'ES6, Vue.js, ...',
        cost: 19.99,
      }
    }
  },
  methods: {
    post () {
      EL.post('/demo/tx', [this.form])
    },
  }
})
