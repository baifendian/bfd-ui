import React from 'react'
import { render } from 'react-dom'
import BubbleChart from 'c/bubbleChart'
    
export default () => {
  render(<BubbleChart radiusMaker="x" name="name" value={{key:'x'}} url="/data/bubbleChart.json" />, document.getElementById('demo'))
}