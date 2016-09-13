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

function clone(obj) {
  var o;
  if (typeof obj == "object") {
    if (obj === null) {  
        o = null;
    } else {
        if (obj instanceof Array) {
          o = [];
          for (var i = 0, len = obj.length; i < len; i++) {
              o.push(clone(obj[i]));
          }
        } else {
            o = {};  
            for (var j in obj) {  
                o[j] = clone(obj[j]);
            }
        }
    }
  } else {
      o = obj;
  }  
  return o;
}  

function getTableDate(page, size) {
  var data = [
    {id: 1, name: '张三', age: 28, gender: 'male', country: '中国', area: '北京', regdate: '2016-03-01' },
    {id: 2, name: '李四', age: 25, gender: 'female', country: '中国', area: '杭州', regdate: '2016-04-11' },
    {id: 3, name: '王五', age: 43, gender: 'male', country: '中国', area: '沈阳', regdate: '2016-05-06' },
    {id: 4, name: '赵某某', age: 30, gender: 'female', country: '中国', area: '上海', regdate: '2016-03-09' },
    {id: 5, name: '钱某某', age: 39, gender: 'male', country: '中国', area: '深圳', regdate: '2015-11-11' },
    {id: 6, name: '孙某某', age: 50, gender: 'male', country: '中国', area: '石家庄', regdate: '2016-06-01' },
    {id: 7, name: '周某某', age: 21, gender: 'female', country: '中国', area: '西安', regdate: '2016-08-13' },
    {id: 8, name: '吴某某', age: 19, gender: 'female', country: '中国', area: '天津', regdate: '2016-02-22' },
    {id: 9, name: '郑某某', age: 51, gender: 'male', country: '中国', area: '武汉', regdate: '2016-01-18' },
    {id: 10, name: '冯某某', age: 24, gender: 'male', country: '中国', area: '广州', regdate: '2016-09-20' }
  ]

  if(page <= 1) {
    return data
  } else {
    var index = page * size
    var newData = []
    for(var i=0; i<size && i<10; i++) {
      var item = clone(data[i])
      item.id = item.id + index;
      item.name += item.id;
      newData.push(item)
    }
    return newData
  }
}

app.get('/api/table', function(req, res) {
  var currentPage = req.query.currentPage || 1
  var pageSize = req.query.pageSize || 10
  var data = getTableDate(currentPage, pageSize)

  res.json({
    code: 200,
    totalList: data,
    currentPage: 1,
    totalPageNum: 300
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