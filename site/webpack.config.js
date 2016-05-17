var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var autoprefixer = require('autoprefixer')
var isProduction = process.argv.slice(2)[0] === '-p'

var config = {
  entry: {
    app: __dirname + '/public/app.jsx'
  },
  output: {
    path: __dirname + '/public/dist',
    filename: '[name]' + (isProduction ? '.[hash]' : '') + '.js',
    chunkFilename: '[id]' + (isProduction ? '.[hash]' : '') + '.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ["es2015", "stage-0", "react"],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'file-loader?name=files/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: 'style!css!postcss'
    }, {
      test: /\.less$/,
      loader: 'style!css!less!postcss'
    }]
  },
  postcss: [autoprefixer({
    browsers: ['last 3 versions']
  })],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      c: path.resolve(__dirname, '../src')
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
    output: {
      comments: false
    }
  }))
  config.plugins.push(function() {
    this.plugin('done', function(statsData) {
      var stats = statsData.toJson()
      console.log(stats.errors)
      var templateFile = 'index.html'
      var template = fs.readFileSync(path.join(__dirname, templateFile), 'utf8')
      template = template.replace(/app.*?.js/, 'app.' + stats.hash + '.js')
      fs.writeFileSync(path.join(__dirname, templateFile), template)
    })
  })
} else {
  config.devtool = '#source-map'
}

module.exports = config