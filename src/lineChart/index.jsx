import React from 'react'
import LineChart from './main'

export default React.createClass({
  
  renderChart() {
    const config = {container: this.refs.container, ...this.props}
    new LineChart(config)
  },

  componentDidMount() {
    this.renderChart()
  },

  shouldComponentUpdate(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.renderChart()
    }
    return true
  },

  render() {
    return <div ref="container" id="test111"></div>
  }
})