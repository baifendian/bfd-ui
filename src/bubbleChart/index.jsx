import React from 'react'
import Chart from '../Chart'
import BubbleChart from './main'

export default React.createClass({
  render() {
    return <Chart type={BubbleChart} className="bubble-chart" {...this.props}/>
  }
})