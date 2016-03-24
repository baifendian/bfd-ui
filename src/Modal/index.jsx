import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './main.less'

// 获取浏览器滚动条的宽度，模态框打开时隐藏 body 滚动条
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
      isOpen: false
    }
  },

  childContextTypes: {
    handleClose: PropTypes.func
  },

  getChildContext() {
    return {
      handleClose: this.close
    }
  },
  
  handleClick(e) {
    if (e.target.className.indexOf('modal-backdrop') !== -1) {
      this.close()
    }
  },

  open() {
    this.setState({isOpen: true})
  },

  close() {
    this.setState({isOpen: false})
  },

  componentDidMount() {
    this.bodyClassName = document.body.className
    this.bodyPaddingRight = parseInt(document.body.style.paddingRight, 10) || 0
  },

  componentWillUpdate(nextProps, nextState) {
    const body = document.body
    if (nextState.isOpen) {
      body.className = this.bodyClassName + ' modal-open'
      body.style.paddingRight = this.bodyPaddingRight + scrollbarWidth + 'px'
    } else {
      setTimeout(() => {
        body.className = this.bodyClassName
        if (this.bodyPaddingRight) {
          body.style.paddingRight = this.bodyPaddingRight + 'px'
        } else {
          body.style.paddingRight = ''
        }
      }, 300)
    }
  },

  render() {
    return (
      <ReactCSSTransitionGroup transitionName="in" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        {this.state.isOpen ? (
          <div className="modal">
            <div className="modal-backdrop" onClick={this.handleClick}></div>
            <div className="modal-dialog">
              <div className="modal-content">
                {this.props.children}
              </div>
            </div>
          </div>
        ) : null}
      </ReactCSSTransitionGroup>
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
        <button type="button" className="close" onClick={this.context.handleClose}>
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