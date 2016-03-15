import React from 'react'
import { render } from 'react-dom'
import message from 'c/message'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

// const info = function () {
//   message.info('这是一条普通的提醒');
// };

// const success = function () {
//   message.success('这是一条成功的提醒');
// };

// const warning = function () {
//   message.warning('这是一条警告的提醒');
// };

// const danger = function () {
//   message.danger('这是一条错误的提醒');
// };

export default React.createClass({

  success() {
    message.success('这是成功信息')
  },

  render() {
    return (
      <div>
        <h1>提示信息</h1>
        <Pre>
{`import  message from 'bfd-ui/lib/message'

const success = function() {};

const App = React.createClass({
  
  success() {
    message.success('这是成功信息')
  },

  render() {
    return <button onClick={this.success}>成功</button>
  }
})`}
        </Pre>

        <button onClick={this.success}>成功</button>
        
        <Props>
          <Prop name="duration" desc="自动关闭时间">
            <Pre>
{`const success = function() {Message.success('这是成功信息'),10}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})