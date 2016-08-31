import React from 'react'
import classnames from 'classnames'
import Chart from '../Chart'
import BubbleChart from './main'

export default props => {
  const { className, ...other } = props
  return (
    <Chart 
      type={BubbleChart} 
      className={classnames('bfd-bubble-chart', className)} 
      {...other} 
    />
  )
}