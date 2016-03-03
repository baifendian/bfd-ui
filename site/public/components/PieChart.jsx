import React from 'react'
import { render } from 'react-dom'
import PieChart from 'c/pieChart/index.jsx'


export default () => {
  render(
    <PieChart name="访问来源" radius={{inner:0.75}} animation={{pie:2500,lineText:500}} tooltip={{enabled:true}} url="/data/pieChart.json" />, 
        document.getElementById('demo')
    )
}
