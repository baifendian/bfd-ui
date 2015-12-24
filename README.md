## 百分点前端UI组件库

### 安装

```sh
$ npm install --save bfd-ui
```

### 使用

```javascript
import { render } from 'react-dom'
import LineChart from 'bfd-ui/src/lineChart'

render(<LineChart config={config}/>, mountNode)
```

### 开发者说明

#### 开发环境安装

```sh
$ git clone http://git.baifendian.com/front-end/bfd-ui.git

$ npm install

# 站点本地服务(文档、Demo的开发环境)
$ npm start

```
#### 如何添加新组件？

`src/yourComponent`

注意：`index.js` 为组件的入口


#### 如何测试、查看效果？=> [站点说明](site/README.md)