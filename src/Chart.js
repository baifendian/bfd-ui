import React from 'react'
import Loading from './Loading'

export default React.createClass({

  renderChart(data) {
    this.config = {container: this.refs.container, ...this.props, data}
    new this.props.type(this.config)
  },

  handleSuccess(res) {
    if (!('containerHeight' in this)) {
      this.refs.container.style.height = this.containerHeight = this.getParentContentHeight() + 'px'
    }
    this.renderChart(res)
  },

  handleLoading() {
    if (this.refs.container) {
      // 非虚拟DOM手动清除
      this.refs.container.innerHTML = null
    }
  },

  getParentContentHeight() {
    const style = window.getComputedStyle(this.refs.container.parentNode)
    let extra = 0

    if (style.boxSizing === 'border-box') {
        extra = parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10) + parseInt(style.borderTopWidth, 10) + parseInt(style.borderBottomWidth, 10)
    }
    return parseInt(style.height, 10) - extra
  },

  render() {
    return (
      <Loading url={this.props.url} onSuccess={this.handleSuccess} onLoading={this.handleLoading}>
        <div ref="container" className={this.props.className}></div>
      </Loading>
    )
  }
})