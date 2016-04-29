import message from './message'

function xhr(option) {

  const type = (option.type || 'GET').toUpperCase()
  const isPOST = type === 'POST'
  const xhr = new XMLHttpRequest()
  const { success, error, url } = option
  const urlCheckTip = `, check the response of '${url}'.`
  
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let response = xhr.responseText
        if (xhr.getResponseHeader('Content-Type').indexOf('application/json') !== -1) {
          response = JSON.parse(xhr.responseText)
        } else {
          message.danger(`Type of response should be 'json'${urlCheckTip}`)
        }

        if ('code' in response && 'data' in response) {
          const code = response.code
          if (code === 200) {
            success && success(response.data)
          } else {
            const msg = 'code ' + code + ', ' + (response.message || 'unknown error')
            if (error) {
              error(msg)
            } else {
              message.danger(msg + urlCheckTip)
            }
          }
        } else {
          message.danger('Wrong data format' + urlCheckTip)
        }
      } else {
        const { status, statusText } = xhr
        const msg = 'Status Code: ' + status + ', ' + statusText + urlCheckTip
        if (error) {
          error(msg)
        } else {
          message.danger(msg)
        }
      }
      option.complete && option.complete()
    }
  }

  let dataArray

  xhr.open(type, url)

  if (isPOST) {
    dataArray = []
    const data = option.data
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    if (data) {
      for (const k in data) {
        if (typeof data[k] === 'object' && data[k]) {
          data[k] = JSON.stringify(data[k])
        }
        dataArray.push(`${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
      }      
    }
  }

  xhr.send(isPOST ? dataArray.join('&') : null)
}

export default xhr