import EL from 'el'
import Vue from 'vue/dist/vue'

import './login.css!css'
import template from './login.html!text'

import ApiHeader from './api_header'

const refreshCaptcha = (comp) => {
  EL.get('/captcha')
    .then(res => {
      comp.$refs.captcha.src = 'data:image/jpeg;base64,' + res.data
    })
}

const fetchPrincipal = (comp) => {
  EL.get('/principal')
    .then(res => {
      comp.user = res.status === 200 ? res.data : null
      !comp.user && refreshCaptcha(comp)
    })
}

export default Vue.component('Login', {
  components: { ApiHeader },
  template,
  data () {
    return {
      user: null,
      form: {
        login_no: '',
        password: '',
        captcha: '',
      }
    }
  },
  mounted () {
    fetchPrincipal(this)
  },
  methods: {
    login () {
      EL.form('/login', this.form)
        .then(res => {
          if (res.result === 'OK') {
            fetchPrincipal(this)
            this.$emit('logon')
          } else {
            refreshCaptcha(this)
          }
        })
    },
    logout () {
      EL.post('/logout')
        .then(() => EL.go())
    },
    principal () {
      fetchPrincipal(this)
    },
    home () {
      EL.go()
    },
    refreshCaptcha () {
      refreshCaptcha(this)
    },
  }
})
