import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './modal.less'

/**
 * 获取浏览器滚动条的宽度，模态框打开时隐藏 body 滚动条
 */
const scrollbarWidth = (() => {
  const scrollDiv = document.createElement('div')
  const body = document.body

  scrollDiv.className = 'modal-scrollbar-measure'
  body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  body.removeChild(scrollDiv)
  
  return scrollbarWidth
})()

// TODO: 1.0版本这两个属性都是必选的
const propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
}

const childContextTypes = {
  /**
   * 响应 ModelHeader 关闭点击事件
   */
  handleClose: PropTypes.func
}

const Modal = React.createClass({
  getInitialState() {
    return {
      isOpen: !!this.props.open
    }
  },

  getChildContext() {
    return {
      handleClose: this.close
    }
  },

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({isOpen: nextProps.open})  
  },

  componentWillUpdate(nextProps, nextState) {
    const body = document.body
    const bodyClassName = body.className
    const bodyPaddingRight = parseInt(body.style.paddingRight, 10) || 0

    if (nextState.isOpen) {
      this.scrollbarWidth = body.scrollHeight > body.clientHeight ? scrollbarWidth : 0
      body.className = bodyClassName + ' modal-open'
      body.style.paddingRight = bodyPaddingRight + scrollbarWidth + 'px'
    } else {
      setTimeout(() => {
        body.className = bodyClassName.replace(' modal-open', '')
        if (bodyPaddingRight) {
          body.style.paddingRight = bodyPaddingRight - this.scrollbarWidth + 'px'
        } else {
          body.style.paddingRight = ''
        }
      }, 150)
    }
  },

  handleModalClick() {
    this.close()
  },

  handleDialogClick(e) {
    e.stopPropagation()
  },

  open() {
    this.setState({isOpen: true})
  },

  close() {
    this.setState({isOpen: false})
    this.props.handleClose && this.props.handleClose()
  },

  render() {
    const { className, ...other } = this.props
    return (
      <ReactCSSTransitionGroup transitionName="in" transitionEnterTimeout={200} transitionLeaveTimeout={150}>
        {this.state.isOpen ? (
          <div className={classnames('bfd-modal', className)} {...other}>
            <div className="modal-backdrop"></div>
            <div className="modal" onClick={this.handleModalClick}>
              <div className="modal-dialog" onClick={this.handleDialogClick}>
                <div className="modal-content">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </ReactCSSTransitionGroup>
    )
  }
})

Modal.propTypes = propTypes
Modal.childContextTypes = childContextTypes

export default Modal