import React, { PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'
import ModalHeader from './ModalHeader'
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
      }, this.closeTimeout)
    }
  },

  closeTimeout: 150,

  handleModalClick(e) {
    if (!this.props.lock && e.target.className === 'modal') {
      this.close()  
    }
  },

  open() {
    this.setState({isOpen: true})
  },

  close(callback) {
    this.setState({isOpen: false})
    callback && setTimeout(callback, this.closeTimeout)
  },

  render() {
    const { className, children, ...other } = this.props

    const childrenWithProps = React.Children.map(children, instance => {
      if (instance.type === ModalHeader) {
        return React.cloneElement(instance, {
          onClose: () => {
            this.close()
          }
        })
      }
      return instance
    })

    return (
      <ReactCSSTransitionGroup transitionName="in" transitionEnterTimeout={200} transitionLeaveTimeout={this.closeTimeout}>
        {this.state.isOpen ? (
          <div className={classnames('bfd-modal', className)} {...other}>
            <div className="modal-backdrop"></div>
            <div className="modal" onClick={this.handleModalClick}>
              <div className="modal-dialog">
                <div className="modal-content">
                  {childrenWithProps}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </ReactCSSTransitionGroup>
    )
  }
})

Modal.propTypes = {
  lock: PropTypes.bool
}

export default Modal