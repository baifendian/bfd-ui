var express = require('express')
var http = require('http')
var path = require('path')
var compression = require('compression')
var fs = require('fs')
var marked = require('marked')
// var beautify = require('js-beautify')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var WebpackConfig = require('./webpack.config')

// marked.setOptions({
//   highlight: function (code, lang, callback) {
//     return beautify(code, { indent_size: 2 })
//   }
// })

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
  res.send(marked(fs.readFileSync(path.join(__dirname, 'post/' + req.query.component + '.md'), 'utf-8')))
})

app.get('*', function(req, res) {
  res.render('index', {
    components: fs.readFileSync(path.join(__dirname, 'config/components.json'), 'utf-8')
  })
})

app.listen(4001, function() {
  console.log('Server listening on http://localhost:4001, Ctrl+C to stop')
})