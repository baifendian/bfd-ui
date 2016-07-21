import React from 'react'
import Chart from '../Chart'
import PieChart from './main'


export default React.createClass({
  render() {
    return <Chart type={PieChart} className="bfd-pie-chart" {...this.props}/>
  }
})