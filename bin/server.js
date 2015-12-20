var express = require('express')
var http = require('http')
var path = require('path')
var compression = require('compression')

var app = express()
app.set('port', process.env.PORT || 4001)

app.use(compression())
app.use(express.static(path.join(__dirname, 'docs/dist')))

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'docs/index.html'))
})

http.createServer(app).listen(app.get('port'), function() {
  console.log('Run http://127.0.0.1:' + app.get('port') + ' to preview.')
})