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

## 受控 / 不受控组件

组件支持不受控的使用方式，关于为什么区分受控 / 不受控请参考 [Controlled / Uncontrolled Components](https://facebook.github.io/react/docs/forms.html#controlled-components)

## 都支持哪些浏览器？

Chrome、Firefox、Safari、IE9+