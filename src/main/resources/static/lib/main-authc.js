import EL from 'el'
import Vue from 'vue/dist/vue'

import 'tachyons/css/tachyons.css!css'
import 'element-ui/lib/theme-default/index.css!css'
import ElementUI from 'element-ui'

import Login from './core/login'

Vue.use(ElementUI)

const template = `
  <div class="core ma2">
    <el-row :gutter="10">
      <el-col :span="12"><Login @logon="logon"></Login></el-col>
    </el-row>
  </div>`

const render = () => new Vue({
  el: '#main',
  components: { Login },
  template,
  methods: {
    logon () {
      const $el = this.$createElement('a', {
        style: 'color: teal',
        attrs: { href: EL.uri() }
      }, 'Home')
      this.$notify({ title: '登录成功', message: $el });
    }
  }
})

EL.csrf().then(render)
