/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/xhr.js
 */

function xhr(option) {

  const request = new window.XMLHttpRequest()

  /**
   * @public
   * @name xhr.baseUrl
   * @type {string}
   * @description 全局基础 URL，常用的场景是接口是另外的服务，方便统一设置路径
   */
  option.url = (xhr.baseUrl || '') + option.url
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

  request.open(option.type, option.url, true)

  let sendData = option.data
  if (Object.prototype.toString.call(sendData) === '[object Object]') {
    sendData = []
    const data = option.data
    if (data) {
      for (const k in data) {
        if (typeof data[k] === 'object' && data[k]) {
          data[k] = JSON.stringify(data[k])
        }
        sendData.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
      }
    }
    sendData = sendData.join('&')

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
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
}

export default xhr