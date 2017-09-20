import $ from 'jquery'
/*
# jqXHR

For backward compatibility with XMLHttpRequest, a jqXHR object will expose the following properties and methods:

- readyState
- responseXML and/or responseText when the underlying request responded with xml and/or text, respectively
- status
- statusText
- abort( [ statusText ] )
- getAllResponseHeaders() as a string
- getResponseHeader( name )
- overrideMimeType( mimeType )
- setRequestHeader( name, value ) which departs from the standard by replacing the old value with the new one rather than concatenating the new value to the old one
- statusCode( callbacksByStatusCode )

- jqXHR.done(function( data, textStatus, jqXHR ) {});
  > An alternative construct to the success callback option, refer to deferred.done() for implementation details.
- jqXHR.fail(function( jqXHR, textStatus, errorThrown ) {});
  > An alternative construct to the error callback option, the .fail() method replaces the deprecated .error() method. Refer to deferred.fail() for implementation details.
- jqXHR.always(function( data|jqXHR, textStatus, jqXHR|errorThrown ) { }); (added in jQuery 1.6)
  > An alternative construct to the complete callback option, the .always() method replaces the deprecated .complete() method.
  > In response to a successful request, the function's arguments are the same as those of .done(): data, textStatus, and the jqXHR object. For failed requests the arguments are the same as those of .fail(): the jqXHR object, textStatus, and errorThrown. Refer to deferred.always() for implementation details.
- jqXHR.then(function( data, textStatus, jqXHR ) {}, function( jqXHR, textStatus, errorThrown ) {});
  > Incorporates the functionality of the .done() and .fail() methods, allowing (as of jQuery 1.8) the underlying Promise to be manipulated. Refer to deferred.then() for implementation details.
*/

import moment from 'moment'

// logging
const log = console.log.bind(console)
const err = console.error.bind(console)

// string -> date
const s2m = input => moment(input)
const s2d = input => moment(input).toDate()

// https://www.awesomes.cn/repo/mzabriskie/axios
const appBaseURI = '/xxx'
const apiBaseURL = 'http://localhost:9000' + appBaseURI
$.ajaxSetup({
  timeout: 5000,
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
})
const uri = path => appBaseURI + (path || '')
const api = path => apiBaseURL + (path || '')
const go = path => window.location = uri(path)

// anti-CSRF
const RESULT_CODE = 'el-result-code' // WebUtil#RESULT_CODE
let _csrfHeaders
const csrf = () => $.post(api('/csrf'))
  .then((data, statusText, jqXHR) => {
    const csrfToken = jqXHR.getResponseHeader(RESULT_CODE)
    _csrfHeaders = (headers) => ({ ...headers, 'el-xsrf': csrfToken })
    log('[CSRF] token:', csrfToken)
  })
const csrfHeaders = (headers) => _csrfHeaders(headers)

// Helpers
const errHandler = err
const resHandler = (req) => (data, statusText, jqXHR) => {
  const status = jqXHR.status
  const result = jqXHR.getResponseHeader(RESULT_CODE)
  log('[RES]', req, { status, result, data })
  return { status, result, data }
}
const serializeDate = (d) => moment(d).format('YYYY-MM-DD')
const paramsSerializer = (params) => {
  let data = {}
  for (let p in params) {
    if (p.constructor && p.constructor === Date) {
      data[p] = serializeDate(params[p])
    } else {
      data[p] = params[p]
    }
  }
  return data
}

// GET with query string
const get = (path, params) => {
  const data = paramsSerializer(params)
  const headers = _csrfHeaders()
  return $
    .ajax({ method: 'get', url: api(path), data, headers })
    .fail(errHandler)
    .then(resHandler('GET ' + path))
}

// POST with query string
const form = (path, params) => {
  const data = paramsSerializer(params)
  const headers = _csrfHeaders()
  return $
    .ajax({ method: 'post', url: api(path), data, headers })
    .fail(errHandler)
    .then(resHandler('FORM ' + path))
}

// POST with json
const post = (path, params) => {
  const headers = _csrfHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
  const data = JSON.stringify(params)
  return $
    .ajax({ method: 'post', url: api(path), data, headers })
    .fail(errHandler)
    .then(resHandler('POST ' + path))
}

export default { get, post, form, csrf, csrfHeaders }
