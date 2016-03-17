import React from 'react'
import Loading from '../Loading'

export default React.createClass({

  renderChart(data) {
    this.config = {container: this.refs.chart, ...this.props, data}
    new this.props.type(this.config)
  },

  handleSuccess(res) {
    this.renderChart(res)
  },

  componentDidMount() {
    this.refs.container.style.height = this.refs.chart.style.height = '100%'
  },

  render() {
    return (
      <div ref="container">
        <Loading url={this.props.url} onSuccess={this.handleSuccess}></Loading>
        <div ref="chart" className={this.props.className}></div>
      </div>
    )
  }
})