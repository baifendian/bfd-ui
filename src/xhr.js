function xhr(option) {

  const request = new XMLHttpRequest()

  option.url = (xhr.baseUrl || '') + option.url
  option.type = (option.type || 'get').toUpperCase()

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
        option.error && option.error(msg)
      }
      option.complete && option.complete()
    }
  }

  request.open(option.type, option.url)

  let sendData = option.data
  if (option.type === 'POST') {
    sendData = []
    const data = option.data
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    if (data) {
      for (const k in data) {
        if (typeof data[k] === 'object' && data[k]) {
          data[k] = JSON.stringify(data[k])
        }
        sendData.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
      }      
    }
    sendData = sendData.join('&')
  }

  option.beforeSend && option.beforeSend(request)

  request.send(sendData)
}

export default xhr