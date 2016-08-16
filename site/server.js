var express = require('express')
var http = require('http')
var path = require('path')
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var compression = require('compression')
var fs = require('fs')

var app = express()
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, './')))

var isProduction = process.argv.slice(2)[0] === '-production'

if (!isProduction) {
  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var WebpackConfig = require('./webpack.config')
  app.use(webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: '/build/',
    stats: {
      colors: true,
      profile: true
    }
  }))
}

app.post('/api/form', function(req, res) {
  res.json({
    code: 200,
    data: {}
  })
})

app.post('/upload.do', function(req, res) {
  var form = new multiparty.Form({uploadDir: './upload'});
  form.on('error', function(err) {
    console.log('Error parsing form: ' + err.stack);
  });
  form.parse(req, function (err, fields, files){
    var filesTmp = JSON.stringify(files,null,2);
    try{
      if (err){
        console.log('parse error: ' + err);
        res.send("写文件操作失败。");
      }else {
        res.send("文件上传成功");
        console.log('parse files: ' + filesTmp);
        var fileNameArr = Object.keys(files);
        var firstFilename = fileNameArr[0];
        var fileDataArr = files[firstFilename];
        var fileData = fileDataArr[0];
        var uploadedPath = fileData.path;
        var dstPath = './upload/' + fileData.originalFilename;
        fs.rename(uploadedPath, dstPath, function(err) {
          if (err){
            console.log("重命名文件错误："+ err);
          } else {
            console.log("重命名文件成功。");
          }
        });
      }
    } catch(e) {}
  });
  res.json({
    code: 200,
    data: {
      id: new Date().getTime()
    }
  })
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var port = process.argv.slice(2)[0] || 4001

app.listen(port, function() {
  console.log('Server listening on http://localhost:' + port + ', Ctrl+C to stop')
})