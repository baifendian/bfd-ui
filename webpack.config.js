var path = require('path')
var config = {
  entry: {
    app: path.resolve(__dirname, 'docs/app.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'docs/dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }],
    // preLoaders: [{
    //   test: /\.jsx?$/,
    //   loader: "eslint-loader",
    //   exclude: /node_modules/
    // }]
  },
  // eslint: {
  //   configFile: path.resolve(__dirname, 'config/.eslintrc'),
  // },
  plugins: []
}
module.exports = config