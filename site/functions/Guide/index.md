## 安装

```sh
npm install bfd-ui --save
```

## 如果不用脚手架，需要注意什么？

BFD UI 抛弃传统的资源加载方式，基于 [webpack](https://webpack.github.io/) 打包，资源种类多种多样，会涉及一些 webpack 的配置，如下：

```js
var autoprefixer = require('autoprefixer')
var config = {
  module: {
    loaders: [{
      test: /\\.(eot|woff|woff2|ttf|svg|png|jpg)(\\?v=[\\d\\.]+)?$/,
      loader: 'file?name=files/[hash].[ext]'
    }, {
      test: /\\.less$/,
      loader: 'style!css!less!postcss'
    }]
  },
  resolve: {
    alias: {
      bfd: 'bfd-ui/lib'
    }
  },
  postcss: [autoprefixer({ browsers: ['last 3 versions'] })]
}
module.exports = config
```

## 受控／非受控组件

## 都支持哪些浏览器？

Chrome、Firefox、Safari、IE9+