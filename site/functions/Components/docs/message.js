import React from 'react'
import { render } from 'react-dom'
import message from 'bfd/message'
import Pre from 'public/Pre'
import { Props, Prop } from 'public/Props'

const MessageDemo = React.createClass({
  
  dnager() {
    message.danger('这是失败信息')
  },

  render() {
    return <button className="btn btn-danger" onClick={this.dnager}>失败</button>
  }
})

const code = `import message from 'bfd-ui/lib/message'

export default React.createClass({
  
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
        <h1>全局提示 @hai.jiang</h1>
        <Pre>{code}</Pre>
        <MessageDemo></MessageDemo>

        <h2>API</h2>

        <h3>message.success(message, [duration])</h3>
        <ul>
          <li>
            <h5>message</h5>
            <p>string | reactElement, 消息内容</p>
          </li>
          <li>
            <h5>duration</h5>
            <p>number, 持续时间，单位秒，默认 2 秒</p>
          </li>
        </ul>

        <h3>message.danger(message, [onClose])</h3>
        <ul>
          <li>
            <h5>message</h5>
            <p>同上</p>
          </li>
          <li>
            <h5>onClose</h5>
            <p>function, 手动关闭后的回调</p>
          </li>
        </ul>

        <h3>message.close()</h3>
        <p>关闭消息</p>
      </div>
    )
  }
})