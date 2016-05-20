import React from 'react'
import { render } from 'react-dom'
import message from 'c/message'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const MessageDemo = React.createClass({
  
  dnager() {
    message.danger('这是失败信息')
  },

  render() {
    return <button className="btn btn-danger" onClick={this.dnager}>失败</button>
  }
})

const code = `import message from 'bfd-ui/lib/message'

const MessageDemo = React.createClass({
  
  dnager() {
    message.danger('这是失败信息')
  },

  render() {
    return <button className="btn btn-danger" onClick={this.dnager}>失败</button>
  }
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>全局提示</h1>
        <Pre>{code}</Pre>
        <MessageDemo></MessageDemo>
        <h2>message.success(message, duration)</h2>
        <h2>message.danger(message, onClose)</h2>
        <Props>
          <Prop name="message" type="string | ReactElement" required>
            <p>消息内容</p>
          </Prop>
          <Prop name="duration" type="number">
            <p>持续时间，单位秒，默认 2 秒，danger类型无效（手动关闭）</p>
          </Prop>
          <Prop name="onClose" type="function">
            <p>手动关闭后的回调</p>
          </Prop>
        </Props>
      </div>
    )
  }
})