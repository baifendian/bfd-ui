var express = require('express')
var http = require('http')
var path = require('path')
var compression = require('compression')
var fs = require('fs')
var jade = require('jade')
var beautify = require('code-beautify')

var filters = jade.filters
filters.highlight = function(source, option) {
  return beautify(source, option.lang)
}


var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

var app = express()
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/dist/',
  stats: {
    colors: true
  }
}))

app.get('/getComponents', function(req, res, next) {
  try {
    var fn = jade.compileFile(__dirname + '/views/components/' + req.query.component + '.jade')
  } catch(e) {}
  res.send(fn())
})

app.get('*', function(req, res) {
  res.render('index', {
    components: fs.readFileSync(path.join(__dirname, 'config/components.json'), 'utf-8')
  })
})

app.listen(4001, function() {
  console.log('Server listening on http://localhost:4001, Ctrl+C to stop')
})