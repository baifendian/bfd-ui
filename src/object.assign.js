Object.assign || (Object.assign = function(target, ...args) {
  for (source of args) {
    Object.keys(source).forEach(function(key) {
      target[key] = source[key]
    })
  }
})