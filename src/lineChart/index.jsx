import React from 'react'
import Chart from '../Chart'
import LineChart from './main'
import './main.less'

export default React.createClass({
  render() {
    return <Chart type={LineChart} className="bfd-line-chart" {...this.props}/>
  }
})