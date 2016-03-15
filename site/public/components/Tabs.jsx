import React from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'c/Tabs'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>选项卡</h1>
        <Pre>
{`import { Tabs, TabList, Tab, TabPanel } from 'bfd-ui/lib/Tabs'

const App = React.createClass({
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>群体特征报告</Tab>
          <Tab>样例用户画像</Tab>
        </TabList>
        <TabPanel>我是群体特征报告</TabPanel>
        <TabPanel>我是样例用户画像</TabPanel>
      </Tabs>
    )
})`}
        </Pre>

      <Tabs>
        <TabList>
          <Tab>群体特征报告</Tab>
          <Tab>样例用户画像</Tab>
        </TabList>
        <TabPanel>我是群体特征报告</TabPanel>
        <TabPanel>我是样例用户画像</TabPanel>
      </Tabs>
        
      </div>
    )
  }
})