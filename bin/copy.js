var fs = require('fs')
var path = require('path')

function copy(src, dist) {

  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist)
  }

  fs.readdir(src, function(err, paths) {
    if (!paths) return
    paths.forEach(function(path) {
      var _src = src + '/' + path
      var _dist = dist + '/' + path
      var stats = fs.statSync(_src)
      if (stats.isFile()) {
        fs.createReadStream(_src).pipe(fs.createWriteStream(_dist))
      } else if (stats.isDirectory()){
        copy(_src, _dist)
      }
    })
  })
}

copy(path.join(__dirname, '../src'), path.join(__dirname, '../lib'))