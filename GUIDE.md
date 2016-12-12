## 安装

```sh
npm install bfd-ui --save
```

## 安装后我怎么使用？

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
webpack 配置完成后，即可在代码中使用组件，以 [DatePciker](/components/DatePicker) 为例：
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
强烈建议基于脚手架开发，省去繁琐的环境配置、项目基本结构的设计以及开发和部署流程的制定等工作


## 很多组件属性都有 defaultXXX，这是干嘛的？

组件支持不受控（属性名：defaultXXX）的使用方式，关于为什么区分受控 / 不受控请参考 [Controlled / Uncontrolled Components](https://facebook.github.io/react/docs/forms.html#controlled-components)


## 如果多次使用一个组件／模块，相同的属性／API如何进行全局配置？

React.Component 有一个公共属性 defaultProps，每个组件实例接收 props 后都会与 defaultProps merge，所以通用的属性修改对应组件的 defaultProps 即可，还是以 [DatePciker](/components/DatePicker) 为例：
```js
Object.assign(DatePicker.defaultProps, {
  placeholder: 'Please select date'
})
```

非 React 组件性质的模块 API 也都提供了相应的全局配置方法，具体见相关模块的文档


## 都支持哪些浏览器？

Chrome、Firefox、Safari、IE9+
