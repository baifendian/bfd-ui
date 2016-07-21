import React from 'react'
import Chart from '../Chart'
import LineChart from './main'
import classnames from 'classnames'
import './main.less'

export default React.createClass({
  render() {
    const { className, ...other } = this.props
    return <Chart type={LineChart} className={classnames('bfd-line-chart', className)} {...other} />
  }
})