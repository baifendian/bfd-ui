import React from 'react'
import { render } from 'react-dom'
import ScatterPlot from 'c/ScatterPlot'

export default () => {
  render(<ScatterPlot category="height" cols={{male:'男',female:'女'}} url="/data/scatterPlot.json" />, document.getElementById('demo'))
}
