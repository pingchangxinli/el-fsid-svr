import EL from 'el'
import Vue from 'vue/dist/vue'
import template from './demo_fm.html!text'

import ApiHeader from '../core/api_header'

export default Vue.component('DemoFm', {
  components: { ApiHeader },
  template,
  data () {
    return {
      repo: 'demo',
      files: []
    }
  },
  computed: {
    repoUri () {
      return '/demo/fm/repos/' + this.repo
    },
    uploadHeaders () {
      return EL.csrfHeaders()
    },
    uploadAction () {
      return EL.api(this.repoUri + '/store')
    },
  },
  mounted () {
    EL.log('[DEMO-FM] current repo:', this.repoUri)
    EL.get(this.repoUri + '/files')
      .then(res => {
        this.files = res.data.map(entry => {
          const name = entry.fileName
          return { name }
        })
      })
  },
  methods: {
    openFiles (file) {
      EL.log('[DEMO-FM] openFiles', file.name)
      EL.go(this.repoUri + '/files/' + file.name)
    },
    eraseFile (file) {
      EL.log('[DEMO-FM] eraseFile', file.name)
      EL.post(this.repoUri + '/files/' + file.name + '/erase')
        .then(() => EL.log('[DEMO-FM] file erased:', file.name))
    },
  }
})
