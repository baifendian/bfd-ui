import React from 'react'
import Chart from '../Chart'
import ScatterPlot from './main'
import './main.less'

export default React.createClass({
  render() {
    return <Chart type={ScatterPlot} className="bfd-scatter-plot" {...this.props}/>
  }
})