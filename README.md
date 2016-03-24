## 百分点前端UI组件库

### 安装

```sh
$ npm install --save bfd-ui
```

### 使用

```javascript
import { render } from 'react-dom'
import LineChart from 'bfd-ui/lib/lineChart'

render(<LineChart config={config}/>, mountNode)
```

环境配置注意（以 webpack 为例）：
* bfd-ui 依赖 eot、woff、woff2、ttf、svg、png、jpg、json、less 等资源，请配置相应的 loader(file/json/less)；
* css 兼容性请配置 postcss-loader 及 autoprefixer；

```javascript
var autoprefixer = require('autoprefixer')
var config = {
  module: {
    loaders: [{
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'file?name=files/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.less$/,
      loader: 'style!css!less!postcss'
    }]
  },
  postcss: [autoprefixer({ browsers: ['last 3 versions'] })]
}
```

### 开发者说明

#### 开发环境安装，要求 npm 3+

```sh
$ git clone http://git.baifendian.com/front-end/bfd-ui.git

$ cd bfd-ui

$ npm install
```

#### 同步到最新版本

```sh
$ cd bfd-ui

$ git pull

$ npm install
```

#### 如何添加新组件？注意首字母大写

`src/YourComponent`

注意：`index.jsx` 为组件的入口


#### 如何测试、查看效果？

```sh
$ npm start
```

[查看详细说明](site/README.md)