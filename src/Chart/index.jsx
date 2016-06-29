import React, { PropTypes } from 'react'
import Fetch from './Fetch'
import classnames from 'classnames'
import './index.less'

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
    const chart = <div style={{height: '100%'}} ref="chart"></div>
    return (
      <div ref="container" className={classnames('bfd-chart', this.props.className)} style={this.props.style}>
        {this.props.url ? <Fetch url={this.props.url} onSuccess={this.handleSuccess}>{chart}</Fetch> : chart}
      </div>
    )
  }
})

Chart.propTypes = {
  url: PropTypes.string,
  data: PropTypes.array,
  customProp({ url, data }) {
    if (!url && !data) {
      return new Error('No `url` or `data` property.')
    }
    if (url && data) {
      return new Error('`url` and `data` can\'t exist at the same time.')
    }
  }
}

export default Chart