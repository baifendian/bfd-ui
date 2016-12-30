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
      bfd: 'bfd-ui/lib' // 更简短
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


## 受控属性与不受控属性

组件支持不受控（`defaultXXX`）的使用方式，关于为什么区分受控 / 不受控请参考 [Controlled / Uncontrolled Components](https://facebook.github.io/react/docs/forms.html#controlled-components)


## 组件全局配置

覆盖或扩展 `defaultProps` 即可，以 [DatePciker](/components/DatePicker) 为例：
```js
DatePicker.defaultProps = Object.assign(DatePicker.defaultProps || {}, {
  placeholder: 'Please select date'
})
```
命令式 API 模块 [message]((/components/message)、[confirm]((/components/confirm)、[xhr]((/components/xhr) 也支持全局配置，涉及 url 方式加载数据的组件以及 [Form](/components/Form) 均依赖 xhr。详细配置请参考其各自文档

> 全局配置后，这些 API 会变成有状态的，即最终结果受配置影响，所以尽量一次性配置并向其它开发者说明


## 浏览器支持

Chrome、Firefox、Safari、IE9+
