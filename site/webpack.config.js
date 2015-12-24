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
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
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
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
}
module.exports = config