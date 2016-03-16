export default option => {

  const type = (option.type || 'GET').toUpperCase()
  const isPOST = type === 'POST'
  const xhr = new XMLHttpRequest()
  
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let response = xhr.responseText
        if (xhr.getResponseHeader('Content-Type').indexOf('application/json') !== -1) {
          response = JSON.parse(xhr.responseText)
        }
        option.success && option.success(response)
      } else {
        option.error && option.error(xhr.statusText)
      }
      option.complete && option.complete()
    }
  }

  if (isPOST) {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')

    const dataArray = []

    if (option.data) {
      for (let k in option.data) {
        dataArray.push(encodeURIComponent(k) + '=' + encodeURIComponent(option.data[k]))
      }      
    }
  }

  xhr.open(type, option.url)
  xhr.send(isPOST ? dataArray.join('&') : null)
}