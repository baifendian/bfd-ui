import React from 'react'
import { render } from 'react-dom'
import ChordDiagram from 'c/chordDiagram'

const data = [{
  name: 'gid',
  total: 5000,
  relation: [{
    target: 'ceil',
    value: 100
  }]
}, {
  name: 'ceil',
  total: 2000,
  relation: [{
    target: 'imei',
    value: 100
  }]
}, {
  name: 'imei',
  total: 200
}]

export default () => {
  render(<ChordDiagram data={data}/>, document.getElementById('demo'))
}