/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import xhr from '../xhr'
import Spinner from '../Spinner'
import './index.less'

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
      return false
    }
    return true
  }
  
  componentDidMount() {
    this.props.url && this.fetch()
  }

  fetch() {
    const timer = this.lazyFetch()
    setTimeout(() => {
      xhr({
        url: this.props.url,
        complete: () => {
          clearTimeout(timer)
        },
        success: ::this.handleSuccess,
        error: ::this.handleError
      })
    }, this.props.delay || 0)
  }

  lazyFetch() {
    return setTimeout(() => {
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
          <Spinner className="bfd-fetch__state" />
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
    const { className, url, onSuccess, defaultHeight, delay, ...other } = this.props
    if (defaultHeight) {
      other.style = Object.assign(other.style || {}, {
        minHeight: defaultHeight + 'px'
      })
    }
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

  // 默认高度，单位像素
  defaultHeight: PropTypes.number,

  // 请求延迟，单位毫秒。测试使用
  delay: PropTypes.number
}

export default Fetch