import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'
import xhr from '../xhr'
import './main.less'

class Fetch extends Component {

  constructor() {
    super()
    this.state = {
      xhr: 'success',
      msg: null
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.fetch()
      this.root.style.height = this.root.offsetHeight + 'px'
      return false
    }
    return true
  }
  
  componentDidMount() {
    this.props.url && this.fetch()
    this.root = ReactDOM.findDOMNode(this)
  }

  fetch() {
    this.setState({xhr: 'fetch-start'})
    this.lazyFetch()
    this.props.onFetch && this.props.onFetch()
    setTimeout(() => {
      xhr({
        url: this.props.url,
        complete: () => {
          clearTimeout(this.loadingTimer)
        },
        success: this.handleSuccess.bind(this),
        error: this.handleError.bind(this)
      })
    }, this.props.delay || 0)
  }

  lazyFetch() {
    this.loadingTimer = setTimeout(() => {
      this.setState({xhr: 'loading'})
    }, 150)
  }

  handleSuccess(data) {
    this.setState({xhr: 'success'})
    this.props.onSuccess(data)
  }

  handleError(msg) {
    this.setState({xhr: 'error', msg})
  }

  stateMap = {
    success() {
      return this.props.children
    },
    loading() {
      return (
        <div className="fetch-mask">
          <div className="state loading">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )
    },
    error() {
      return (
        <div className="fetch-mask">
          <div className="state error">{this.state.msg}</div>
        </div>
      )
    }
  }

  render() {
    const { className, ...other } = this.props
    return (
      <ReactCSSTransitionGroup
        transitionName="in" 
        transitionEnterTimeout={100} 
        transitionLeaveTimeout={100}
        className={classnames('bfd-fetch', className)} 
        {...other}
      > 
        {(this.stateMap[this.state.xhr] || (() => null)).call(this)}
      </ReactCSSTransitionGroup>
    )
  }
}

Fetch.propTypes = {
  url: PropTypes.string,   
  onSuccess: PropTypes.func  
}

export default Fetch