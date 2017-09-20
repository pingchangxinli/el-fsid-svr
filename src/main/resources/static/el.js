import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

// import $ from './el-jquery'
const $ = {}

// logging
const log = console.log.bind(console)
const err = console.error.bind(console)

// string -> date
const s2m = input => moment(input)
const s2d = input => moment(input).toDate()
const ymd = input => moment(input).format('YYYY-MM-DD')
const dtm = input => moment(input).format('YYYY-MM-DD hh:mm:ss')

// https://www.awesomes.cn/repo/mzabriskie/axios
const appBaseURI = '/xxx'
const apiBaseURL = 'http://localhost:9000' + appBaseURI
const ajax = axios.create({
  baseURL: apiBaseURL,
  timeout: 5000,
  withCredentials: true,
})
const uri = path => appBaseURI + (path || '')
const api = path => apiBaseURL + (path || '')
const go = path => window.location = uri(path)

// anti-CSRF
const RESULT_CODE = 'el-result-code' // WebUtil#RESULT_CODE
let _csrfHeaders
const csrf = $.csrf || (() => ajax.post('/csrf')
  .then(res => {
    const csrfToken = res.headers[RESULT_CODE]
    _csrfHeaders = (headers) => ({ ...headers, 'el-xsrf': csrfToken }) // WebUtil#XSRF_NAME
    log('[CSRF] token:', csrfToken)
  }))
const csrfHeaders = $.csrfHeaders || ((headers) => _csrfHeaders(headers))

// Helpers
const errHandler = err
const resHandler = (req) => (res) => {
  const { status, data, headers } = res
  const result = headers[RESULT_CODE]
  log('[RES]', req, { status, result, data })
  return { status, result, data }
}
const serializeDate = (d) => moment(d).format('YYYY-MM-DD')
const paramsSerializer = (params) => qs.stringify(params, { serializeDate })

// GET with query string
const get = $.get || ((url, params) =>
  ajax
    .request({ method: 'get', url, params, paramsSerializer, headers: _csrfHeaders() })
    .catch(errHandler)
    .then(resHandler('GET ' + url)))

// POST with query string
const form = $.form || ((url, params) => {
  const headers = _csrfHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  return ajax
    .request({ method: 'post', url, params, paramsSerializer, headers })
    .catch(errHandler)
    .then(resHandler('FORM ' + url))
})

// POST with json
const post = $.post || ((url, data) =>
  ajax
    .request({ method: 'post', url, data, headers: _csrfHeaders() })
    .catch(errHandler)
    .then(resHandler('POST ' + url)))

// WebSocket
const sockConnect = (endpoint, messageHandler) => {
  const sock = new SockJS(api(endpoint))
  sock.onopen = () => {
    log('[SOCK] opened.')
  }
  sock.onclose = () => {
    log('[SOCK] closed.')
  }
  sock.onmessage = (e) => {
    try {
      messageHandler(JSON.parse(e.data))
    } catch (ex) {
      err('[SOCK] bad message:', e, ex)
    }
  }
  return sock
}

// Message
const $msg = (comp, msg) => {
  comp.$message(msg)
}

// Notification
const $notify = (comp, msg) => {
  const todo = msg.type === 'TODO'
  const title = '[' + dtm(msg.createTime) + '] ' + (todo ? msg.content : '消息通知')
  const message = todo ? '' : comp.$createElement('i', { style: 'color: teal'}, msg.content)
  comp.$notify({ title, message });
}

export default { log, err, s2m, s2d, ymd, dtm, uri, api, go, get, post, form, csrf, csrfHeaders, sockConnect, $msg, $notify }
