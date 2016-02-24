import React from 'react'
import { render } from 'react-dom'
import LineChart from 'c/lineChart/index.jsx'

export default () => {
  render(<LineChart category="date" cols={{x:'用户',y:'销量'}} url="/data/lineChart.json" />, document.getElementById('demo'))
}