import React from 'react'
import ChinaMap from 'c/ChinaMap'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({
  render() {
    return (
      <div>
      	<h1>中国地图</h1>
        <Pre>
{`import ChinaMap from 'bfd-ui/lib/ChinaMap'

const App = React.createClass({
  render() {
    return <ChinaMap/>
})`}
        </Pre>

        <ChinaMap/>
      </div>
    )
  }
})