import Vue from 'vue/dist/vue'

const template = '<el-card class="hello">Hello {{ message }}!</el-card>'

export default Vue.component('Hello', {
  template,
  props: [ 'message' ]
})
