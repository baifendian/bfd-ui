import React from 'react'
import { render } from 'react-dom'
import BubbleChart from 'c/barChart'

const data = [
{
  name:'2015/01/01',
  value:10
},{
  name:'2015/01/02',
  value:20
},{
  name:'2015/01/03',
  value:30
},{
  name:'2015/01/04',
  value:10
},{
  name:'2015/01/05',
  value:50
},{
  name:'2015/01/06',
  value:60
},{
  name:'2015/01/07',
  value:20
},
]
    
export default () => {
  render(<BubbleChart title="数据标签量趋势及日环比（近90天）" titleSub="2015.11.11 - 2016.01.11" data={data} />, document.getElementById('demo'))
}