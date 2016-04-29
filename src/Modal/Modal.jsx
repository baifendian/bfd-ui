import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './modal.less'

const scrollbarWidth = (() => {
  const scrollDiv = document.createElement('div')
  const body = document.body

  scrollDiv.className = 'modal-scrollbar-measure'
  body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  body.removeChild(scrollDiv)
  
  return scrollbarWidth
})()

const Modal = React.createClass({

  getInitialState() {
    return {
      isOpen: false
    }
  },

  getChildContext() {
    return {
      modal: this
    }
  },

  componentWillUpdate(nextProps, nextState) {
    const body = document.body
    const bodyClassName = body.className
    const bodyPaddingRight = parseInt(body.style.paddingRight, 10) || 0

    if (nextState.isOpen && !this.state.isOpen) {
      this.scrollbarWidth = body.scrollHeight > window.innerHeight ? scrollbarWidth : 0
      body.className = bodyClassName + ' modal-open'
      body.style.paddingRight = bodyPaddingRight + this.scrollbarWidth + 'px'
    } else if (!nextState.isOpen && this.state.isOpen) {
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

Modal.childContextTypes = {
  modal: PropTypes.instanceOf(Modal)
}

export default Modal