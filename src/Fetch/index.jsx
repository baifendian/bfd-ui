import React from 'react'
import xhr from '../xhr'
import classnames from 'classnames'
import './main.less'

export default React.createClass({

  getInitialState() {
    return {
      xhr: null,
      msg: null
    }
  },

  shouldComponentUpdate(nextProps) {
    // URL变化触发ajax请求
    if (this.props.url !== nextProps.url) {
      this.fetch()
      return false
    }
    return true
  },
  
  componentDidMount() {
    const container = this.refs.container
    if (!parseInt(getComputedStyle(container).height, 10)) {
      container.style.height = '100%'
    }
    this.fetch()
  },

  fetch() {
    this.lazyFetch()
    this.props.onFetch && this.props.onFetch()
    setTimeout(() => {
      xhr({
        url: this.props.url,
        complete: () => {
          clearTimeout(this.loadingTimer)
        },
        success: this.handleSuccess,
        error: this.handleError
      })
    }, this.props.delay || 0)
  },

  // 加载快的情况下，不展示loading
  lazyFetch() {
    this.loadingTimer = setTimeout(() => {
      this.setState({xhr: 'loading'})
    }, 150)
  },

  handleSuccess(data) {
    this.setState({xhr: 'success'})
    this.props.onSuccess(data)
  },

  handleError(msg) {
    this.setState({xhr: 'error', msg})
  },

  render() {
    return (
      <div className={classnames('bfd-fetch', this.props.className)} style={this.props.style} ref="container">
        {this.state.xhr !== 'success' ? (
          <div className="fetch-mask">
          {(() => {
            switch(this.state.xhr) {
              case 'loading': return (
                <div className="state loading">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )
              case 'error': return <div className="state error">{this.state.msg}</div>
            }
          })()}
          </div>
        ) : null}
        {this.props.children}
      </div>
    )
  }
})