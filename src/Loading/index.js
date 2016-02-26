import React from 'react'
import xhr from '../xhr'
import './main.less'

export default React.createClass({

  getInitialState() {
    return {
      xhr: 'loading',
      msg: null
    }
  },

  fetch() {
    this.setState({xhr: 'loading'})
    this.props.onLoading && this.props.onLoading()
    setTimeout(() => {
      xhr({
        url: this.props.url,
        success: this.handleSuccess,
        error: this.handleError
      })
    }, this.props.delay || 0)
  },

  handleSuccess(res) {
    if ('code' in res && 'data' in res) {
      if (res.code === 200) {
        if (res.data && res.data.length) {
          this.setState({xhr: 'success'})
          this.props.onSuccess(res.data)
        } else {
          this.setState({xhr: 'noData'})    
        }
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
    this.fetch()
  },

  render() {
    let dom
    if (this.state.xhr === 'success') {
      dom = this.props.children
    } else {
      dom = (
        <div className="loading-mask">
          {(() => {
            switch(this.state.xhr) {
              case 'loading': return '加载中...'
              case 'error':   return this.state.msg
              case 'noData':  return '无数据'
            }
          })()}
        </div>
      )
    }
    return dom
  }
})