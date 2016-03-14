import React from 'react'
import { render } from 'react-dom'
import Pre from '../Pre.jsx'
import { Props, Prop } from '../Props.jsx'
import Message from 'c/message/index.jsx'
import Button from 'c/message/button.jsx'

const info = function () {
  Message.info('这是一条普通的提醒');
};

const success = function () {
  Message.success('这是一条成功的提醒');
};

const warning = function () {
  Message.warning('这是一条警告的提醒');
};

const danger = function () {
  Message.danger('这是一条错误的提醒');
};

// export default () => {
// 	render(
//     <div>
//       <Button onClick={info}>普通消息</Button>
//       <Button onClick={success}>成功消息</Button>
//       <Button onClick={danger}>错误消息</Button>
//       <Button onClick={warning}>警告消息</Button>
//     </div>,document.getElementById('demo')
//   )
// }

export default React.createClass({
  render() {
    return (
      <div>
        <h1>提示信息</h1>
        <Pre>
{`import  Message from 'bfd-ui/lib/message'

  import  Button from 'bfd-ui/lib/message'

  const success = function() {Message.success('这是成功信息')};

const App = React.createClass({
  render() {
    return <Button onClick={success}>成功</Button>
  }
})`}
        </Pre>

        <Button onClick={success}>成功</Button>
        
        <Props>
          <Prop name="duration" desc="自动关闭时间">
            <Pre>
{`onst success = function() {Message.success('这是成功信息'),10}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})