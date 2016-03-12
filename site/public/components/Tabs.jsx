import React from 'react'
import { render } from 'react-dom'
import { Tabs, TabList, Tab, TabPanel } from 'c/Tabs'

export default () => {
  render((
    <Tabs>
      <TabList>
        <Tab>群体特征报告</Tab>
        <Tab>样例用户画像</Tab>
      </TabList>
      <TabPanel>我是群体特征报告</TabPanel>
      <TabPanel>我是样例用户画像</TabPanel>
    </Tabs>
  ), document.getElementById('demo'))
}