import React from 'react'
import { render } from 'react-dom'
import Message from 'c/message/index.jsx'
import Button from 'c/message/button.jsx'

const success = function() {
  Message.success('这是成功信息');
};

const info = function() {
  Message.info('这是提示信息');
};
const warning = function() {
  Message.warn('这是警告信息');
};
const error = function() {
  Message.error('这是错误信息');
};

export default () => {
	render(
  	<div>
  		<Button onClick={success}>成功</Button>&nbsp;&nbsp;
  		<Button onClick={info}>提示</Button>&nbsp;&nbsp;
  		<Button onClick={warning}>警告</Button>&nbsp;&nbsp;
  		<Button onClick={error}>错误</Button>
  	</div>,document.getElementById('demo')
  	)
}