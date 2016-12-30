var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var rimraf = require('rimraf')
var LiveReloadPlugin = require('webpack-livereload-plugin')
var beautify = require('code-beautify')

var isProduction = process.argv.slice(2)[0] === '-p'

rimraf.sync(__dirname + '/build')

var config = {
  entry: {
    app: __dirname + '/index'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name]' + (isProduction ? '.[hash]' : '') + '.js',
    chunkFilename: '[id]' + (isProduction ? '.[hash]' : '') + '.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ["es2015", "stage-0", "react"],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.(eot|woff|woff2|svg|ttf|png|jpg|jpeg)(\?v=[\d\.]+)?$/,
      loader: 'file?name=files/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }, {
      test: /\.less$/,
      loader: 'style!css!less!postcss'
    }, {
      test: /\.md$/,
      loader: 'html!markdown'
    }, {
      test: /\.doc$/,
      loader: 'babel!doc'
    }]
  },
  resolveLoader: {
    alias: {
      'doc': path.join(__dirname, './loaders/doc')
    }
  },
  markdownLoader: {
    highlight: (code, lang) => beautify(code, lang)
  },
  postcss: [require('postcss-for'), require('autoprefixer')({
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9', // React doesn't support IE8 anyway
    ]
  })],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'bfd': path.resolve(__dirname, '../src'),
      'public': path.resolve(__dirname, './public'),
      'scaffolding': path.resolve(__dirname, '../../create-bfd-app'),
      'react-update': path.resolve(__dirname, '../../react-update')
    }
  },
  plugins: []
}

if (isProduction) {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }))
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }))
} else {
  config.plugins.push(new LiveReloadPlugin({
    appendScriptTag: true
  }))
}

config.plugins.push(function() {
  this.plugin('done', function(statsData) {
    var stats = statsData.toJson()
    var html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
    var distPath = config.output.publicPath + 'app.' + (isProduction ? stats.hash + '.' : '') + 'js'
    html = html.replace(/(<script src=").*?(")/, '$1' + distPath + '$2')
    fs.writeFileSync(path.join(__dirname, 'index.html'), html)
  })
})

module.exports = config
