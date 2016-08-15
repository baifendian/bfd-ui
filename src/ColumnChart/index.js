import React from 'react'
import Chart from '../Chart'
import ColumnChart from './main'
import classnames from 'classnames'
import './main.less'

export default React.createClass({
  render() {
    const { className, ...other } = this.props
    return <Chart type={ColumnChart} className={classnames('bfd-column-chart', className)} {...other} />
  }
})