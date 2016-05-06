import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import warning from '../warning'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './main.less'

const Message = React.createClass({

  getInitialState() {
    return {}
  },

  handleRemove() {
    this.setState({show: false})
  },

  render() {
    const { show, type, message } = this.state
    return (
      <ReactCSSTransitionGroup transitionName="in" transitionEnterTimeout={200} transitionLeaveTimeout={150}>
        {show ? (
          <div className={classnames('bfd-message', type)}>
            {message}
            {type === 'danger' ? <span className="glyphicon glyphicon-remove remove" onClick={this.handleRemove}></span> : null}
          </div>
        ) : null}
      </ReactCSSTransitionGroup>
    )
  }
})


let instance

function showMessage(type, message, duration = 2) {

  if (process.env.NODE_ENV !== 'production') {
    if (typeof message !== 'string' && !(message && message['$$typeof'])) {
      warning('`message` should be `string` or `ReactElement`, check the first param of message.' + type)
    }
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

export default {
  success(message, duration) {
    showMessage('success', message, duration)
  },

  danger(message) {
    showMessage('danger', message)
  }
}
