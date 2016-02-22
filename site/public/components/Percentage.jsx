import React from 'react'
import { render } from 'react-dom'
import Percentage from 'c/percentage/index.jsx'

const config = { 
      data:80
    }

export default () => {
  render(<Percentage config={config} />, document.getElementById('demo'))
}
