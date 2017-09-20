import EL from 'el'
import Vue from 'vue/dist/vue'
import template from './demo_dp.html!text'

import ApiHeader from '../core/api_header'

export default Vue.component('DemoDp', {
  components: { ApiHeader },
  template,
  data () {
    return {
      form: {
        keyword: '',
        since: '2017-04-20',
        clock: '14:17:54',
        offset: 0,
        limit: 20,
        sortBy: '',
        sortDirection: 'ASC'
      },
      sortable: ['deptId', 'emplId']
    }
  },
  methods: {
    hello () {
      EL.get('/demo/')
    },
    query () {
      EL.get('/demo/dp', this.form)
        .then(res => {
          const msgs = res.data.rows.map(msg => ({ ...msg, postAt: EL.s2d(msg.postAt) }))
          EL.log('Result:', msgs)
        })
    },
  }
})
