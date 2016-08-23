import React from 'react'
import { Link } from 'react-router'
import Pre from 'public/Pre'
import Button from 'bfd/Button'

export default () => {
  return (
    <div className="home">
      <h1>BFD UI</h1>
      <h2>企业级前端整体解决方案</h2>
      <Button>安装 v1.0</Button>
      <Button>开始</Button>

      <Pre>
{`import DatePicker from 'bfd/DatePicker'

const DatePickerDemo = React.createClass({
  
  handleSelect(date) {
    console.log(date)
  },

  render() {
    return <DatePicker onSelect={this.handleSelect} />
  }
})`}
      </Pre>

      <dl>
        <dt>组件</dt>
        <dd>基于 React 组件化思想开发，简单高效</dd>
      </dl>

      <dl>
        <dt>全面</dt>
        <dd>基础组件，高级交互，甚至可视化都可以搞定</dd>
      </dl>

      <dl>
        <dt>环境</dt>
        <dd>配套的前端脚手架模板相结合，摆脱繁琐的环境配置，避免重复的基础工作，飞一般的开发体验</dd>
      </dl>

      <dl>
        <dt>免费</dt>
        <dd>基于 BSD 协议，免费开源</dd>
      </dl>
    </div>
  )
}