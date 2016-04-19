var express = require('express')
var http = require('http')
var path = require('path')
var compression = require('compression')
var fs = require('fs')

var app = express()
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))

var isProduction = process.argv.slice(2)[0] === '-p'

if (!isProduction) {
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var WebpackConfig = require('./webpack.config')
  app.use(webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: '/dist/',
    stats: {
      colors: true
    }
  }))
}

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var port = process.argv.slice(2)[0] || 4001

app.listen(port, function() {
  console.log('Server listening on http://localhost:' + port + ', Ctrl+C to stop')
})