import React from 'react'
import { render } from 'react-dom'
import Percentage from 'c/percentage'

const config = { 
      data : 80,
      outterColor : '#b3e5fc',
      innerColor : '#fff',
      textColor : '#fff'
    }

export default () => {
  render(<Percentage config={config} />, document.getElementById('demo'))
}
