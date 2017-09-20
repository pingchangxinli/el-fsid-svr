import EL from 'el'
import Vue from 'vue/dist/vue'
import template from './demo_udc.html!text'

import ApiHeader from '../core/api_header'
import SrcBlock from '../core/src_block'

export default Vue.component('DemoUdc', {
  components: { ApiHeader, SrcBlock },
  template,
  data: function () {
    return {
      res: '',
      all: [],
      udc: '',
      udcItems: [],
    }
  },
  computed: {
    src () {
      return typeof this.res === 'object' ? JSON.stringify(this.res, void 0, 2) : this.res
    }
  },
  mounted () {
    EL.get('/demo/udcs/all')
      .then(res => this.all = res.data)
  },
  methods: {
    loadUdc (udc) {
      if (!udc) {
        this.udc = ''
        this.udcItems = []
        return
      }
      EL.get('/demo/udcs/udc/' + udc)
        .then(res => this.udcItems = res.data)
    },
    storeUdc () {
      if (!this.udc) return
      const payload = {
        udc: this.udc,
        items: [
          { code: '01', name: '优' },
          { code: '02', name: '良' },
          { code: '03', name: '及格' },
          { code: '04', name: '不及格' },
        ]
      }
      EL.post('/demo/udcs/store', payload)
        .then(() => {
          this.res = payload
          this.udcItems = payload.items
          EL.$msg(this, 'UDC was stored')
        })
    },
    evictUdc () {
      if (!this.udc) return
      EL.post('/demo/udcs/udc/' + this.udc + '/evict')
        .then(() => EL.$msg(this, 'UDC was evicted'))
    },
    evictAll () {
      EL.post('/demo/udcs/evict')
        .then(() => EL.$msg(this, 'All UDCs were evicted'))
    },
    sampleItems () {
      EL.get('/demo/udcs/sample/items')
        .then(res => this.res = res.data)
    },
    sampleItemsWithUdcNames () {
      EL.get('/demo/udcs/sample/itemsWithUdcNames')
        .then(res => this.res = res.data)
    },
  }
})
