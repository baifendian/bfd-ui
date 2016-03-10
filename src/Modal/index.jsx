import 'bfd-bootstrap'
import './main.less'
import React, { PropTypes } from 'react'
import classNames from 'classnames'


const scrollbarWidth = (() => {
  const scrollDiv = document.createElement('div')
  const body = document.body

  scrollDiv.className = 'modal-scrollbar-measure'
  body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  body.removeChild(scrollDiv)
  
  return scrollbarWidth
})()


/**
 * Modal
 */
const Modal = React.createClass({

  getInitialState() {
    return {
      show: false,
      fadeIn: false
    }
  },

  childContextTypes: {
    onClose: PropTypes.func
  },

  getChildContext() {
    return {
      onClose: this.props.onClose
    }
  },
  
  handleClick(e) {
    if (e.target.className.indexOf('modal-backdrop') !== -1) {
      this.props.onClose()
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isOpen && !nextState.show) {
      this.setState({show: true})
      setTimeout(() => {
        this.setState({fadeIn: true})
      }, 10)
      return false
    }

    if (!nextProps.isOpen && nextState.fadeIn) {
      this.setState({fadeIn: false})
      setTimeout(() => {
        this.setState({show: false})
      }, 300)
      return false
    }

    const body = document.body
    if (nextState.show) {
      body.className = this.bodyClassName + ' modal-open'
      body.style.paddingRight = this.bodyPaddingRight + scrollbarWidth + 'px'
    } else {
      body.className = this.bodyClassName
      if (this.bodyPaddingRight) {
        body.style.paddingRight = this.bodyPaddingRight + 'px'
      } else {
        body.style.paddingRight = ''
      }
    }

    return true
  },

  componentDidMount() {
    this.bodyClassName = document.body.className
    this.bodyPaddingRight = parseInt(body.style.paddingRight, 10) || 0
  },

  render() {
    return (
      <div ref="modal" style={{display: this.state.show ? 'block' : 'none'}} className={classNames('modal fade', {'in': this.state.fadeIn}, this.props.className)}>
        <div className={classNames('modal-backdrop fade', {'in': this.state.fadeIn})} onClick={this.handleClick}></div>
        <div className="modal-dialog">
          <div className="modal-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})


/**
 * ModalHeader
 */
const ModalHeader = React.createClass({

  contextTypes: {
    onClose: PropTypes.func,
  },

  render() {
    return (
      <div className="modal-header">
        <button type="button" className="close" onClick={this.context.onClose}>
          <span>&times;</span>
        </button>
        {this.props.children}
      </div>
    )
  }
})

/**
 * ModalBody
 */
const ModalBody = React.createClass({

  render() {
    return (
      <div className="modal-body">{this.props.children}</div>
    )
  }
})

export { Modal, ModalHeader, ModalBody }