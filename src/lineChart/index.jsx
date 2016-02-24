import React from 'react'
import LineChart from './main'
import Loading from '../Loading'

export default React.createClass({

  renderChart(data) {
    this.config = {container: this.refs.container, ...this.props, data}
    new LineChart(this.config)
  },

  handleSuccess(res) {
    this.renderChart(res)
  },

  handleLoading() {
    if (this.refs.container) {
      // 非虚拟DOM手动清除
      this.refs.container.innerHTML = null
    }
  },

  render() {
    return (
      <Loading url={this.props.url} onSuccess={this.handleSuccess} onLoading={this.handleLoading}>
        <div ref="container" className="line-chart"></div>
      </Loading>
    )
  }
})