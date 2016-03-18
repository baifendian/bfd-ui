import React from 'react'
import { render } from 'react-dom'
import message from 'c/message'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({

  success() {
    message.success('这是成功信息')
  },

  render() {
    return (
      <div>
        <h1>提示信息</h1>
        <Pre>
{`import message from 'bfd-ui/lib/message'

const App = React.createClass({
  
  success() {
    message.success('这是成功信息')
  },

  render() {
    return <button onClick={this.success}>成功</button>
  }
})`}
        </Pre>

        <button className="btn btn-success" onClick={this.success}>成功</button>
        
        <Props>
          <Prop name="type" desc="消息类型">
            <Pre>
{`message.success('这是成功信息')
message.info('这是一条普通的提醒')
message.warning('这是一条警告的提醒')
message.danger('这是一条错误的提醒')
`}
            </Pre>
          </Prop>
          <Prop name="duration" desc="自动关闭时间">
            <Pre>
{`message.success('这是成功信息', 10)`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})