import 'bfd-bootstrap'
import './main.css'
import React from 'react'
import classNames from 'classnames'
import Notification from 'rc-notification';

let defaultDuration = 1.5;
let top;
let messageInstance;
let key = 1;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls: 'alert-message',
    transitionName: 'move-up',
    style: {
      top: top
    }  // 覆盖原来的样式
  });
  return messageInstance;
}

function notice(content, duration = defaultDuration, type, onClose) {
  let iconClass = ({
    'info': 'alert-info',
    'success': 'alert-success',
    'error': 'alert-danger',
    'warn': 'alert-warning',
  })[type];

 

  let instance = getMessageInstance();
  instance.notice({
    key: key,
    duration: duration,
    style: {},
    content: <div className={'alert ' + iconClass}>
      <span>{content}</span>
    </div>,
    onClose: onClose
  });
}

export default {
  info(content, duration, onClose) {
    return notice(content, duration, 'info', onClose);
  },
  success(content, duration, onClose) {
    return notice(content, duration, 'success', onClose);
  },
  error(content, duration, onClose) {
    return notice(content, duration, 'error', onClose);
  },
  warn(content, duration, onClose) {
    return notice(content, duration, 'warn', onClose);
  },
  config(options) {
    if (options.top) {
      top = options.top;
    }
  }
};