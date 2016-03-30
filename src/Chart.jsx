import React, { PropTypes } from 'react'
import Fetch from './Fetch'
import classnames from 'classnames'
import './chart.less'

const propTypes = {
  url: PropTypes.string,
  data: PropTypes.array,
  __valid(props) {
    if (!props.url && !props.data) {
      return new Error('url和data属性至少提供一个')
    }
    if (props.url && props.data) {
      return new Error('url和data属性只能提供一个')
    }
  }
}

const Chart = React.createClass({

  renderChart(data) {
    this.config = {container: this.refs.chart, ...this.props, data}
    new this.props.type(this.config)
  },

  handleSuccess(res) {
    this.renderChart(res)
  },

  componentDidMount() {
    const container = this.refs.container
    if (!parseInt(getComputedStyle(container).height, 10)) {
      container.style.height = '100%'
    }
    if (this.props.data) {
      this.renderChart(this.props.data)
    }
  },

  render() {
    const chart = <div style={{height:'100%'}} ref="chart"></div>
    return (
      <div ref="container" className={classnames('bfd-chart', this.props.className)} style={this.props.style}>
        {this.props.url ? <Fetch url={this.props.url} onSuccess={this.handleSuccess}>{chart}</Fetch> : chart}
      </div>
    )
  }
})

Chart.propTypes = propTypes

export default Chart