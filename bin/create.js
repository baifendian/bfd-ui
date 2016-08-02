var mkdirp = require('mkdirp')
var _ = require('underscore')
var fs = require('fs')
var path = require('path')
var chalk = require('chalk')

var option = process.argv.slice(2)
var name = option[0]

if (name) {
  var dir = path.join(__dirname, '../src/' + name + '/')
  var template = path.join(__dirname, 'template/')
  
  mkdirp.sync(dir)

  var files = [{
    source: template + 'index.js',
    target: dir + 'index.js'
  }, {
    source: template + 'index.less',
    target: dir + 'index.less'
  }, {
    source: template + 'doc.js',
    target: path.join(__dirname, '../site/public/components/') + name + '.js'
  }]

  var context = {
    name: name,
    className: name.replace(/([A-Z])/g, '-$1').slice(1).toLowerCase()
  }
  files.forEach(function(item) {
    fs.writeFileSync(item.target, _.template(fs.readFileSync(item.source, 'utf8'))(context))
  })

  console.log(chalk.green('Build success!'))
} else {
  console.log(chalk.red('No component name provided, try `npm run create MyComponent` instead.'))
}