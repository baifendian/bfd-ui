import React from 'react'
import { render } from 'react-dom'
import ScatterPlot from 'c/ScatterPlot/index.jsx'

const cols = {
  x: 'x数',
  y: 'y数'
}
const data = [{
  x: 234,
  y: 55,
  date: '01-01'
}, {
  x: 499,
  y: 122,
  date: '01-02'
}, {
  x: 1067,
  y: 500,
  date: '01-03'
}, {
  x: 500,
  y: 800,
  date: '01-04'
}, {
  x: 340,
  y: 201,
  date: '01-05'
}]

export default () => {
  render(<ScatterPlot category="date" cols={cols} data={data} />, document.getElementById('demo'))
}