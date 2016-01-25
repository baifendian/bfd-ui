const onMatch = function(url) {

  Router.onMatchCallBacks.forEach(callback => {
    callback(url)
  })

  const callback = Router.stringMap[url]

  if (callback) {
    
    callback(url)

  } else if (Router.regExps.length) {

    let hasMatched = false
    
    Router.regExps.every(regExp => {

      let match
      let {reg, querys, callback} = regExp
    
      if (match = url.match(reg)) {
        match.shift()
        let query = {}
        querys.forEach((name, i) => {
          query[name] = match[i]
        })
        callback(url, query)

        hasMatched = true

        return false
      }
    })

    if (!hasMatched) {
      // 404
    }

  } else {
    // 404
  }
}

const Router = {

  onMatchCallBacks: [],

  // Do something when page load or url change.
  onMatch(callback) {
    Router.onMatchCallBacks.push(callback)
  },

  stringMap: {},

  regExps: [],

  on(url, callback) {

    if (url.indexOf(':') !== -1) {

      let reg = url.replace(/:[^\/.]+/g, '(.+)').replace(/\//g, '\\\/')
      
      Router.regExps.push({
        reg: new RegExp('^' + reg + '$'),
        querys: url.match(/:[^\/.]+/g).map(query => query.slice(1)),
        callback: callback
      })

    } else {
      if (Router.stringMap[url]) {
        throw url + ' has been set already'
      }
      Router.stringMap[url] = callback
    }
  },

  go(url) {
    history.pushState({
      url
    }, '', url)
    onMatch(url)
  }
}

window.onpopstate = function(e) {
  onMatch(e.state.url)
}

// Match rules when page ready
document.addEventListener('DOMContentLoaded', event => {
  onMatch(location.pathname + location.search)
})

export default Router