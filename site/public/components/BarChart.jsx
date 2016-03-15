import React from 'react'
import BarChart from 'c/BarChart'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

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
}]

export default React.createClass({
  render() {
    return (
      <div>
        <h1>柱状图</h1>
        <Pre>
{`import BarChart from 'bfd-ui/lib/BarChart'

const App = React.createClass({
  render() {
    return <BubbleChart title="数据标签量趋势及日环比（近90天）" titleSub="2015.11.11 - 2016.01.11" data={data} />
  }
})`}
        </Pre>
        
        <BubbleChart title="数据标签量趋势及日环比（近90天）" titleSub="2015.11.11 - 2016.01.11" data={data} />

        <Props>
          <Prop name="title" type="String" desc="标题"></Prop>
          <Prop name="titleSub" type="String" desc="自标题"></Prop>
          <Prop name="data" type="Array" desc="二维格式数据">
            <Pre>
{`[{
  name: '2014/01/01',
  value: 10,
}, {
  name: '2014/01/02',
  value: 20,
}, {
  name: '2014/01/03',
  value: 20,
}, {
  name: '2014/01/04',
  value: 20,
}, {
  name: '2014/01/05',
  value: 20,
}, {
  name: '2014/01/06',
  value: 20,
}, {
  name: '2014/01/07',
  value: 20,
}, {
  name: '2014/01/08',
  value: 20,
},]`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})