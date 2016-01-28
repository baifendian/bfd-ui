var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var config = {
  entry: {
    app: __dirname + '/public/app.jsx'
    // app: __dirname + '/public/components/LineChart.jsx'
  },
  output: {
    path: __dirname + '/public/dist',
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/dist/'
  },
  externals: {
    // 'bfd-bootstrap': false
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }, {
      test: /\.(eot|woff|woff2|ttf|svg)$/,
      loader: 'file-loader?name=files/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.pre$/,
      loader: 'raw-loader'
    }]
    // preLoaders: [{
    //   test: /\.jsx?$/,
    //   loader: "eslint-loader",
    //   exclude: /node_modules/
    // }]
  },
  resolve: {
    alias: {
      c: path.resolve(__dirname, '../src')
    }
  },
  // eslint: {
  //   configFile: path.resolve(__dirname, 'config/.eslintrc'),
  // },
  plugins: [
    new ExtractTextPlugin("[name].css")
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}
module.exports = config