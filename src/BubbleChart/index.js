import React from 'react'
import Chart from '../Chart'
import BubbleChart from './main'

export default props => {
  render() {
    const { className, ...other } = props
    return (
      <Chart 
        type={BubbleChart} 
        className={classnames('bfd-bubble-chart', className)} 
        {...other} 
      />
    )
  }
}