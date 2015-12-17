var path = require('path')
var webpack = require('webpack')
var config = {
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    library: 'bfdUI',
    libraryTarget: 'umd'
  },
  externals: {
    d3: true
  },
  resolve: {
    alias: {

    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }],
    preLoaders: [{
      test: /\.jsx?$/,
      loader: "eslint-loader",
      exclude: /node_modules/
    }]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: []
}
module.exports = config