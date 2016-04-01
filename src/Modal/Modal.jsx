import 'bfd-bootstrap'
import React, { PropTypes, Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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


const childContextTypes = {
  /**
   * 响应 ModelHeader 关闭点击事件
   */
  handleClose: PropTypes.func
}

const Modal = React.createClass({
  getInitialState() {
    return {
      isOpen: false    
    }
  },

  getChildContext() {
    return {
      handleClose: this.close
    }
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
  },

  render() {
    return (
      <ReactCSSTransitionGroup transitionName="in" transitionEnterTimeout={200} transitionLeaveTimeout={150}>
        {this.state.isOpen ? (
          <div className="bfd-modal">
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

Modal.childContextTypes = childContextTypes

export default Modal