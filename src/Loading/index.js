import React from 'react'
import xhr from '../xhr'
import './main.less'

export default React.createClass({

  getInitialState() {
    return {
      xhr: null,
      msg: null
    }
  },

  fetch() {
    this.lazyLoading()
    this.props.onLoading && this.props.onLoading()
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
  lazyLoading() {
    this.loadingTimer = setTimeout(() => {
      this.setState({xhr: 'loading'})
    }, 150)
  },

  handleSuccess(res) {
    if ('code' in res && 'data' in res) {
      if (res.code === 200) {
        this.props.onSuccess(res.data)
      } else {
        this.handleError(res.message)
      }
    } else {
      throw this.props.url + '返回的数据格式必须为{code: xxx, data: []}'
    }
  },

  handleError(msg) {
    this.setState({xhr: 'error', msg})
  },

  shouldComponentUpdate(nextProps, nextState) {
    // URL变化触发ajax请求
    if (this.props.url !== nextProps.url) {
      this.fetch()
      return false
    }
    return true
  },
  
  componentDidMount() {
    const style = this.refs.container.parentNode.style
    if (style.position !== 'absolute') {
      style.position = 'relative'
    }
    this.fetch()
  },

  render() {
    let dom
    if (this.state.xhr === 'success') {
      dom = null
    } else {
      dom = (
        <div className="loading-mask" ref="container">
          {(() => {
            switch(this.state.xhr) {
              case 'loading': return '加载中...'
              case 'error':   return this.state.msg
            }
          })()}
        </div>
      )
    }
    return dom
  }
})