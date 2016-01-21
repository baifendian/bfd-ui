import React from 'react'
import { render } from 'react-dom'
import ChinaMap from 'c/chinaMap/index.jsx'

export default () => {
  render(<ChinaMap/>, document.getElementById('demo'))
}