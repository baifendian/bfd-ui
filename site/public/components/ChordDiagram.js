import React from 'react'
import ChordDiagram from 'c/ChordDiagram'
import Pre from '../Pre'

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

export default React.createClass({
  render() {
    return (
      <div>
        <h1>弦图</h1>
        <Pre>
{`import ChordDiagram from 'bfd-ui/lib/ChordDiagram'
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

const App = React.createClass({
  render() {
    return <ChordDiagram data={data}/>
})`}
        </Pre>

        <ChordDiagram data={data}/>
      
      </div>
    )
  }
})