import React from 'react'
import LineChart from './main'

export default React.createClass({
  
  renderChart() {
    new LineChart(this.config)
  },

  componentDidMount() {
    this.config = {container: this.refs.container, ...this.props}
    this.renderChart()
  },

  shouldComponentUpdate(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.config.data = nextProps.data
      this.renderChart()
    }
    return true
  },

  render() {
    return <div ref="container"></div>
  }
})