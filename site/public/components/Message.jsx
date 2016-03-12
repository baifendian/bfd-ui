import React from 'react'
import { render } from 'react-dom'
import Message from 'c/message'
import Button from 'c/message/button'

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

export default () => {
	render(
    <div>
      <Button onClick={info}>普通消息</Button>
      <Button onClick={success}>成功消息</Button>
      <Button onClick={danger}>错误消息</Button>
      <Button onClick={warning}>警告消息</Button>
    </div>,document.getElementById('demo')
  )
}