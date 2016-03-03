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
    this.props.onLoading()
    xhr({
      url: this.props.url,
      success: this.handleSuccess,
      error: this.handleError
    })
  },

  handleSuccess(res) {

    if (res.code === 200) {
      this.setState({xhr: 'success'})
      this.props.onSuccess(res.data)
    } else {
      this.handleError(res.message)
    }
  },

  handleError(msg) {
    this.setState({xhr: 'error', msg})
  },

  shouldComponentUpdate(nextProps) {
    // URL变化触发ajax请求
    if (this.props.url !== nextProps.url) {
      this.fetch()
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
            }
          })()}
        </div>
      )
    }
    return dom
  }
})