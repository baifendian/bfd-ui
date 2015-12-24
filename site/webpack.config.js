var path = require('path')
var config = {
  entry: {
    app: path.resolve(__dirname, 'public/app.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: '[name].js'
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
  plugins: []
}
module.exports = config