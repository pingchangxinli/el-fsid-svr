import EL from 'el'
import Vue from 'vue/dist/vue'
// import VueRouter from 'vue-router'
import VueUI from './core/vue-ui'
import VueHighlight from './core/vue-highlight'

import APIs from './apis'

// Vue.use(VueRouter)
Vue.use(VueUI)
Vue.use(VueHighlight)

const messageListener = (comp) => (msg) => {
  EL.log('[SOCK] received message:', msg)
  EL.$notify(comp, msg)
}

const main = () => {
  return EL.get('/principal')
    .then(({ status }) => {
      if (status === 204) {
        EL.go('/authc.html')
      } else {
        new Vue({
          el: '#main',
          components: { APIs },
          template: '<APIs />',
          mounted () {
            EL.sockConnect('/ws', messageListener(this))
          }
        })
      }
    })
}

EL.csrf().then(main)
