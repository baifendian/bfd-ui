import React from 'react'
import Loading from './Loading'

export default React.createClass({

  renderChart(data) {
    this.config = {container: this.refs.chart, ...this.props, data}
    new this.props.type(this.config)
  },

  handleSuccess(res) {
    this.renderChart(res)
  },

  getParentContentHeight() {
    const style = window.getComputedStyle(this.refs.container.parentNode)
    let extra = 0

    if (style.boxSizing === 'border-box') {
        extra = parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10) + parseInt(style.borderTopWidth, 10) + parseInt(style.borderBottomWidth, 10)
    }
    return parseInt(style.height, 10) - extra
  },

  componentDidMount() {
    const height = this.getParentContentHeight()
    this.refs.container.style.height = this.refs.chart.style.height = height + 'px'
  },

  render() {
    return (
      <div ref="container" className={this.props.className}>
        <Loading url={this.props.url} onSuccess={this.handleSuccess}></Loading>
        <div ref="chart"></div>
      </div>
    )
  }
})