## 百分点 UI 组件库

http://192.168.188.154:4001


#### 开发规范

* 开发过程中发现可复用的部分，向团队提出来，避免重复造轮子

* 依赖的组件如果功能不满足需求，可联系组件的作者处理，不得直接修改他人组件

* 修复某个 bug 后，commit 时可自动关联和关闭 bug，包含关键字（fix #bug号）即可，如 `git commit -m "fix #33"`

* 每个组件的根元素设置 className 为 bfd-xxx，如 bfd-datepicker，并作为 CSS 的命名空间

* 组件库本身依赖 bootstrap，所以 bootstrap 支持的部分不需要单独写样式，到时候更新 bfd-bootstrap 即可

* 所有组件要支持自定义 className 以及 style 属性，并在文档中说明

* 支持传入 children 的组件，请在文档中加上 children 属性

* 注意代码规范 http://git.baifendian.com/front-end/style-guide

* 代码规范已经用 eslint 来做错误提醒，提交前请保证自己的组件没有代码规范的错误

* 同一个主版本下每次修改需要保证向下兼容，如 v1.1 到 v1.2

* 因为要考虑向下兼容，所以产生很多多余的、想修改的代码等等，可以记录下来，等到主版本升级后再一起解决

* 代码更新时记录对用户来说有必要的修改说明，因为发布新版本时需要放在 changeLog 里

* 每个组件根目录下建立 __tests__ 文件夹来写单元测试，每次提交前跑一遍 `npm test`，测试通过后再提交


### 安装

```sh
$ npm install --save bfd-ui
```


### 使用

```javascript
import DatePicker from 'bfd-ui/lib/DatePicker/DatePicker'

ReactDOM.render(<DatePicker />, mountNode)
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



### 开发

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

#### 开始编写一个组件

```sh
# 创建组件文件夹
$ mkdir src/YourComponent

# 创建组件入口
$ touch src/YourComponent/index.jsx
```

#### 编写 Demo、文档

```sh
$ touch site/public/components/YourComponent.jsx

$ npm start
```

查看 http://localhost:4001/components/YourComponent