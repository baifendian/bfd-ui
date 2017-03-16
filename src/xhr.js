/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * @public
 * @name xhr
 * @param {object} option 配置项
 * ```js
 * {
 *   type: 'DELETE', // 请求类型，支持所有 HTTP 请求类型
 *   url: '/user/5', // 请求地址
 *   data: {}, // 发送的数据，如果是对象会被字符串化并设置请求头 Content-Type
 *   beforeSend: request => {}, // 发送前处理逻辑，参数为当前 XMLHttpRequest 对象
 *   success: () => {}, // 成功后的回调，是否调用以及参数是什么取决于全局 xhr.success 的处理
 *   error: () => {}, // 失败后的回调，是否调用以及参数是什么取决于全局 xhr.error 的处理
 *   complete: () => {} // 请求完成后的回调，无论是否成功
 * }
 * ```
 * @return {object} 返回当前 XMLHttpRequest 对象
 * @description ajax 请求
 */
function xhr(option) {

  const request = new window.XMLHttpRequest()

  /**
   * @public
   * @name xhr.getUrl
   * @param {object} option 当前请求配置
   * @description 实现动态 url
   * ```js
   * xhr.getUrl = option => '//192.168.11.13/' + option.url
   * ```
   * @return {string} 返回实际请求 url
   */
  if (xhr.getUrl) {
    option.url = xhr.getUrl(option)
  } else {

    /**
     * @public
     * @name xhr.baseUrl
     * @type {string}
     * @description 全局基础 URL，常用的场景是接口是另外的服务，方便统一设置路径
     */
    option.url = (xhr.baseUrl || '') + option.url
  }

  option.type = (option.type || 'get').toUpperCase()

  let timer

  /**
   * @public
   * @type {number}
   * @name xhr.timeout
   * @description 请求超时全局配置，单位毫秒
   */
  if (xhr.timeout) {
    timer = setTimeout(() => {
      request.abort()

      /**
       * @public
       * @name xhr.onTimeout
       * @description 请求超时全局回调
       * @param {object} option 当前请求配置
       */
      xhr.onTimeout && xhr.onTimeout(option)
    }, xhr.timeout)
  }

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        let response = request.responseText
        if (request.getResponseHeader('Content-Type').indexOf('application/json') !== -1) {
          response = JSON.parse(response)
        }

        /**
         * @public
         * @name xhr.dataFilter
         * @param {*} res 服务器返回的数据
         * @param {object} option 当前请求配置
         * @description 全局数据过滤管道
         * ```js
         * xhr.dataFilter = res => res.data
         * ```
         */
        if (xhr.dataFilter) {
          response = xhr.dataFilter(response, option)
        }

        /**
         * @public
         * @name xhr.success
         * @param {*} res 服务器返回的数据
         * @param {object} option 当前请求配置
         * @description 全局成功回调，在 dataFilter 后执行，此方法会覆盖单独的 success
         * 方法，如果需要可手动调用
         * ```js
         * import xhr from 'bfd/xhr'
         * import message from 'bfd/message'
         *
         * xhr.success = (res, option) => {
         *   if (typeof res !== 'object') {
         *     message.danger(option.url + ': response data should be JSON')
         *     return
         *   }
         *   switch (res.code) {
         *     case 200:
         *       option.success && option.success(res.data)
         *       break
         *     case 401:
         *       // redirect to '/login'
         *       break
         *     default:
         *       message.danger(res.message || 'unknown error')
         *   }
         * }
         * ```
         */
        const success = xhr.success || option.success
        success && success(response, option)
      } else {
        const { status, statusText } = request
        const msg = 'Status Code: ' + status + ', ' + statusText

        /**
         * @public
         * @name xhr.error
         * @description 全局错误回调，与 success 同理
         * @param {string} msg 错误信息
         * @param {object} option 当前请求配置
         */
        const error = xhr.error || option.error
        error && error(msg, option)
      }
      clearTimeout(timer)
      option.complete && option.complete()
    }
  }

  let sendData = option.data

  const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
  const isArray = arr => Array.isArray(arr)

  let sendDataStr = ''

  if (['get', 'GET'].indexOf(option.type)){
    for (const key in sendData) {
      if (sendDataStr != '') {
        sendDataStr += '&'
      }
      sendDataStr += key + '=' + sendData[key]
    }
  }

  let link='?'
  if(option.url.indexOf('?')){
    link='&'
  }

  request.open(option.type, option.url+(sendDataStr && link+sendDataStr), option.hasOwnProperty('async')?option.async:true)

  if (!['get', 'GET'].indexOf(option.type) && isObject(sendData)) {
    sendData = Object.assign({}, sendData)
    sendData = Object.keys(sendData).map(key => {
      let value = sendData[key]
      if (isArray(value) || isObject(value)) {
        value = JSON.stringify(value)
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    }).join('&')

    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    )
  }

  /**
   * @public
   * @type {object}
   * @name xhr.header
   * @description 全局请求头设置
   * ```js
   * xhr.header = {
   *   token: 'YUSDDS12SD'
   * }
   * ```
   */
  if (xhr.header) {
    Object.keys(xhr.header).forEach(key => {
      request.setRequestHeader(key, xhr.header[key])
    })
  }

  option.beforeSend && option.beforeSend(request)

  request.send(sendData)

  return request
}

export default xhr
