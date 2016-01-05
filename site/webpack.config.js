var path = require('path')
var webpack = require('webpack')
var config = {
  entry: {
    app: __dirname + '/public/app.jsx'
  },
  output: {
    path: __dirname + '/public/dist',
    filename: '[name].js',
    chunkFilename: 'demos.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(eot|woff|woff2|ttf|svg)$/,
      loader: 'file-loader?name=files/[hash].[ext]'
    }]
    // preLoaders: [{
    //   test: /\.jsx?$/,
    //   loader: "eslint-loader",
    //   exclude: /node_modules/
    // }]
  },
  resolve: {
    alias: {
      bootstrap: 'bootstrap/dist/css/bootstrap.min.css',
      c: path.resolve(__dirname, '../src')
    }
  },
  // eslint: {
  //   configFile: path.resolve(__dirname, 'config/.eslintrc'),
  // },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}
module.exports = config