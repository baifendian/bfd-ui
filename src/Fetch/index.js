/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Fetch/index.js
 */

import './index.less'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import xhr from '../xhr'

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
    this.lazyFetch()
    setTimeout(() => {
      xhr({
        url: this.props.url,
        complete: () => {
          clearTimeout(this.loadingTimer)
        },
        success: ::this.handleSuccess,
        error: ::this.handleError
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
        <div className="bfd-fetch__mask">
          <div className="bfd-fetch__state bfd-fetch__state-loading">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )
    },
    error() {
      return (
        <div className="bfd-fetch__mask">
          <div className="bfd-fetch__state bfd-fetch__state-error">{this.state.msg}</div>
        </div>
      )
    }
  }

  render() {
    const { className, ...other } = this.props

    delete other.url
    delete other.onSuccess
    delete other.delay

    return (
      <div className={classnames('bfd-fetch', className)} {...other}>
        {(this.stateMap[this.state.xhr] || (() => null)).call(this)}
      </div>
    )
  }
}

Fetch.propTypes = {

  // 数据源 URL，内部调用 xhr 模块
  url: PropTypes.string,

  // 成功后的回调，参数为返回的数据。error 时会直接显示在对应的容器内
  onSuccess: PropTypes.func,

  // 请求延迟，单位毫米，主要用于测试，正式环境不要使用
  delay: PropTypes.number
}

export default Fetch