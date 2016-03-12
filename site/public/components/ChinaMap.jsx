import React from 'react'
import { render } from 'react-dom'
import ChinaMap from 'c/chinaMap'

export default () => {
  render(<ChinaMap/>, document.getElementById('demo'))
}