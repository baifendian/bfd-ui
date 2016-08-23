/**
 * @public
 * @name xhr
 * @description ajax 请求
 * @param {object} option 请求配置
 * ```js
 * {
 *   // 请求类型，支持所有 HTTP 请求类型
 *   type: 'DELETE', 
 *
 *   // URL 地址
 *   url: '/user/5', 
 *   
 *   // 提交的数据，支持 FormData（IE10+）
 *   data: {
 *     key: 'value' 
 *   }, 
 *
 *   // 请求发送前操作，如 setRequestHeader、定义 onprogress 事件等
 *   beforeSend: xhr => {
 *     // xhr.setRequestHeader()
 *   }, 
 *
 *   // 各个状态的回调，如果设置了全局回调，则不会自动执行
 *   success: data => {},
 *   error: msg => {},
 *   complete: () => {}
 * }
 * ```
 */
function xhr(option) {

  const request = new window.XMLHttpRequest()

  option.url = (xhr.baseUrl || '') + option.url
  option.type = (option.type || 'get').toUpperCase()

  let timer
  if (xhr.timeout) {
    timer = setTimeout(() => {
      request.abort()
      xhr.onTimeout && xhr.onTimeout(option)
    }, xhr.timeout)
  }

  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        let response = request.responseText
        if (request.getResponseHeader('Content-Type').indexOf('application/json') !== -1) {
          response = JSON.parse(request.responseText)
        }
        if (xhr.dataFilter) {
          response = xhr.dataFilter(response, option)
        }
        const success = xhr.success || option.success
        success && success(response, option)
      } else {
        const { status, statusText } = request
        const msg = 'Status Code: ' + status + ', ' + statusText
        const error = xhr.error || option.error
        error && error(msg)
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

  if (xhr.header) {
    Object.keys(xhr.header).forEach(key => {
      request.setRequestHeader(key, xhr.header[key])
    })
  }

  option.beforeSend && option.beforeSend(request)

  request.send(sendData)
}

export default xhr