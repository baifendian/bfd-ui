class Fetch {
  
  constructor(url, context, param) {
    this.url = url
    this.param = param
    this.callbacks = []
    this.xhr = new XMLHttpRequest()
    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState === 4) {
        if (this.xhr.status === 200) {
          let response = this.xhr.responseText
          if (this.xhr.getResponseHeader('Content-Type').indexOf('application/json') !== -1) {
            response = JSON.parse(this.xhr.responseText)
          }
          this.callbacks.forEach((callback) => {
            callback.call(context, response)
          })
        }
      }
    }
    this._request()
  }

  _request() {
    this.xhr.open('GET', this.url + this._paramToQueryString())
    this.xhr.send(null)
  }

  _paramToQueryString() {
    if (typeof this.param === 'object') {
      let querys = []
      Object.keys(this.param).forEach((key) => {
        querys.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.param[key]))
      })
      return '?' + querys.join('&')
    } else {
      return ''
    }
  }

  then(callback) {
    callback && this.callbacks.push(callback)
    return this
  }

  setParam(param) {
    if (typeof param === 'object') {
      Object.keys(param).forEach((key) => {
        this.param[key] = param[key]
      })
    } else {
      this.param[param] = arguments[1]
    }
    this._request()
    return this
  }
}

export default {
  fetch(url, param) {
    return new Fetch(url, this, param)
  }
}