import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'

const scrollbarWidth = (() => {
  const scrollDiv = document.createElement('div')
  const body = document.body

  scrollDiv.className = 'bfd-modal--scrollbar-measure'
  body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  body.removeChild(scrollDiv)
  
  return scrollbarWidth
})()

class Modal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: props.open || false
    }
  }

  getChildContext() {
    return {
      modal: this
    }
  }

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({open: nextProps.open})  
  }

  componentWillUpdate(nextProps, nextState) {
    const body = document.body
    const bodyClassName = body.className
    const bodyPaddingRight = parseInt(body.style.paddingRight, 10) || 0

    if (nextState.open && !this.state.open) {
      this.scrollbarWidth = body.scrollHeight > window.innerHeight ? scrollbarWidth : 0
      body.className = bodyClassName + ' bfd-modal--open'
      body.style.paddingRight = bodyPaddingRight + this.scrollbarWidth + 'px'
    } else if (!nextState.open && this.state.open) {
      setTimeout(() => {
        body.className = bodyClassName.replace(' bfd-modal--open', '')
        if (bodyPaddingRight) {
          body.style.paddingRight = bodyPaddingRight - this.scrollbarWidth + 'px'
        } else {
          body.style.paddingRight = ''
        }
      }, this.closeTimeout)
    }
  }

  closeTimeout = 150

  handleModalClick(e) {
    if (!this.props.lock && e.target.className === 'bfd-modal__modal') {
      this.close()  
    }
  }

  open() {
    this.setState({open: true})
  }

  close(callback = this.props.onClose) {
    this.setState({open: false})
    callback && setTimeout(callback, this.closeTimeout)
  }

  render() {
    const { className, children, ...other } = this.props
    return (
      <ReactCSSTransitionGroup 
        transitionName="bfd-modal--in" 
        transitionEnterTimeout={200} 
        transitionLeaveTimeout={this.closeTimeout}
      >
        {this.state.open && (
          <div className={classnames('bfd-modal', className)} {...other}>
            <div className="bfd-modal__backdrop"></div>
            <div className="bfd-modal__modal" onClick={e => this.handleModalClick(e)}>
              <div className="bfd-modal__modal-dialog">
                <div className="bfd-modal__modal-content">
                  {children}
                </div>
              </div>
            </div>
          </div>
        )}
      </ReactCSSTransitionGroup>
    )
  }
}

Modal.childContextTypes = {
  modal: PropTypes.instanceOf(Modal)
}

Modal.propTypes = {
  open: PropTypes.bool,
  lock: PropTypes.bool,
  onClose: PropTypes.func
}

export default Modal