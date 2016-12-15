# BFD UI

[![build status](https://img.shields.io/travis/baifendian/bfd-ui.svg)](https://travis-ci.org/baifendian/bfd-ui)
[![npm package](https://img.shields.io/npm/v/bfd-ui.svg)](https://www.npmjs.org/package/bfd-ui)
[![NPM downloads](http://img.shields.io/npm/dm/bfd-ui.svg)](https://npmjs.org/package/bfd-ui)

企业级 React 组件库 [http://ui.baifendian.com](http://ui.baifendian.com)

## 安装

```sh
npm install bfd-ui --save
```

## 使用

BFD UI 抛弃传统的资源加载方式，基于 [webpack](https://webpack.github.io/) 打包，资源种类多种多样，会涉及一些 webpack 的配置，如下：

```js
{
  module: {
    loaders: [{
      test: /\\.(eot|woff|woff2|ttf|svg|png|jpg)(\\?v=[\\d\\.]+)?$/,
      loader: 'file?name=files/[hash].[ext]'
    }, {
      test: /\\.css$/,
      loader: 'style!css'
    }]
  },
  resolve: {
    alias: {
      bfd: 'bfd-ui/lib'
    }
  }
}
```
webpack 配置完成后，即可在代码中使用组件，以 [DatePciker](http://ui.baifendian.com/components/DatePicker) 为例：
```js
import React, { Component } from 'react'
import DatePicker from 'bfd/DatePicker'

class App extends Component {

  handleSelect(date) {
    console.log(date)
  }

  render() {
    return <DatePicker onSelect={this.handleSelect} />
  }
}
```
> 强烈建议基于[脚手架](https://github.com/baifendian/create-bfd-app)开发，省去繁琐的环境配置、项目基本结构、模板以及开发和部署相关工作

更多说明参考 [GUIDE](GUIDE.md)


## 更新日志

[CHANGELOG](CHANGELOG.md)


## 参与开发

### 安装开发环境

点击右上角 Fork

```sh
git clone https://github.com/yourName/bfd-ui.git

# DEMO 站集成了脚手架项目的说明，所以需要依赖这个项目的一些资源，与 bfd-ui clone 在同一目录下即可
git clone https://github.com/baifendian/create-bfd-app.git

cd bfd-ui

npm install

npm start
```

查看: http://localhost:4001


### 编写一个新组件

```sh
npm run create MyComponent
```

查看: http://localhost:4001/components/MyComponent


### 开发规范

- 向下兼容
- 单元测试：组件根目录下创建 `__tests__` 文件夹
- 代码规范参考 [airbnb react](https://github.com/airbnb/javascript/tree/master/react)


### 提交代码

push 后发起 pull request 即可
