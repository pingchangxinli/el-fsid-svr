import Vue from 'vue/dist/vue'

const template = '<pre v-highlight="src" style="margin: 0;"><code :class="lang"></code></pre>'

export default Vue.component('SrcBlock', {
  template,
  props: [ 'lang', 'src' ]
})
