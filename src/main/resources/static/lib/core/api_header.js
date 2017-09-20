import Vue from 'vue/dist/vue'

const template = `
  <div class="api-header">
    <div class="dib f5">
      <b class="blue">{{ method }}</b>
      <i :class="apiTextStyle">{{ apiRootPath }}{{ api }}</i>
    </div>
    <div class="red" v-if="notice">{{ notice }}</div>
  </div>
  `

export default Vue.component('ApiHeader', {
  template,
  props: [ 'method', 'api', 'strike', 'notice' ],
  computed: {
    apiRootPath () {
      return '/crm'
    },
    apiTextStyle () {
      return 'green' + (this.strike ? ' strike' : '')
    }
  }
})
