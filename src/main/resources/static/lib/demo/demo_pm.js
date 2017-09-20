import EL from 'el'
import Vue from 'vue/dist/vue'
import template from './demo_pm.html!text'

import ApiHeader from '../core/api_header'

export default Vue.component('DemoPm', {
  components: { ApiHeader },
  template,
  data () {
    return {
      form: {
        msg: 'Hello from Demo!',
        mail: 'neopan@126.com',
        targets: ['1', '2', '3'],
      }
    }
  },
  methods: {
    sendMsg () {
      EL.post('/demo/pm/msg', this.form)
    },
    sendTodo () {
      EL.post('/demo/pm/todo', this.form)
    },
    sendMail () {
      EL.post('/demo/pm/mail', this.form)
    },
  }
})
