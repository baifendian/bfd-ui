var path = require('path')
var webpack = require('webpack')

var isProduction = process.argv.slice(2)[0] === '-p'

var config = {
  entry: {
    app: __dirname + '/public/app.jsx'
  },
  output: {
    path: __dirname + '/public/dist',
    filename: '[name].js',
    chunkFilename: '[id].js',
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
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'file-loader?name=files/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }],
    noParse: []
    // ,
    // preLoaders: [{
    //   test: /\jsx?$/,
    //   loader: "eslint-loader",
    //   exclude: /node_modules/
    // }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      c: path.resolve(__dirname, '../src')
    }
  },
  plugins: []
}

if (isProduction) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config