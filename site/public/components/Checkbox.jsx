import React from 'react'
import { render } from 'react-dom'
import Checkbox from 'c/Checkbox/index.jsx'

export default () => {
  render(<Checkbox value="apple" onChange={e => {alert(e.target.value)}}>苹果</Checkbox>, document.getElementById('demo'))
}