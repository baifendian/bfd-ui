import './index.less'
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import warning from 'warning'
import classnames from 'classnames'
import Button from 'bfd/Button'

class Message extends Component {

  handleRemove() {
    this.setState({show: false})
    if (typeof this.state.duration === 'function') {
      this.state.duration()
    }
  }

  render() {
    const { show, type, message } = this.state
    return (
      <ReactCSSTransitionGroup transitionName="bfd-message--in" transitionEnterTimeout={200} transitionLeaveTimeout={150}>
        {show && (
          <div className={classnames('bfd-message', {[`bfd-message--${type}`]: type})}>
            {message}
            {type === 'danger' && (
              <Button
                transparent 
                icon="remove" 
                className="bfd-message__remove" 
                onClick={::this.handleRemove} 
              />
            )}
          </div>
        )}
      </ReactCSSTransitionGroup>
    )
  }
}

let instance

const showMessage = (type, message, duration = 2) => {
  if (process.env.NODE_ENV !== 'production') {
    warning(typeof message === 'string' || (message && React.isValidElement(message)), '`message` should be `string` or `ReactElement`, check the first param of message.' + type)
  }
  if (!instance) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance = render(<Message />, container)
  }
  instance.state.show || instance.setState({
    message,
    type,
    duration,
    show: true
  })
  if (type !== 'danger') {
    setTimeout(() => {
      instance.setState({show: false})
    }, duration * 1000)
  }
}

const message = {
  success(message, duration) {
    showMessage('success', message, duration)
  },

  danger(message, onClose) {
    showMessage('danger', message, onClose)
  },

  close() {
    instance && instance.setState({show: false})
  }
}
export default message