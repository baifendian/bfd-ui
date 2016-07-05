import React from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'c/Tabs'
import Percentage from 'c/Percentage'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const TabsDemo = React.createClass({
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
  }
})

export default React.createClass({

  getInitialState() {
    return {
      tabs: [{
        name: '新建页签A'
      }, {
        name: '新建页签B'
      }]
    }
  },

  handleClose(index) {
    const tabs = this.state.tabs
    tabs.splice(index, 1)
    this.setState({ tabs, activeIndex: tabs.length - 1 })
  },

  handleAdd(e) {
    e.preventDefault()
    const tabs = this.state.tabs
    tabs.push({
      name: '新建页签' + String.fromCharCode((67 + Math.random() * 24).toFixed(0))
    })
    this.setState({ tabs, activeIndex: tabs.length - 1 })
  },

  handleChange(activeIndex) {
    this.setState({ activeIndex })
  },

  render() {
    return (
      <div>
        <h1>选项卡 @hai.jiang</h1>
        <Pre>
{`import { Tabs, TabList, Tab, TabPanel } from 'bfd-ui/lib/Tabs'

export default React.createClass({
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
  }
})`}
        </Pre>

        <TabsDemo />
        
        <h2>可添加和关闭的</h2>

        <Pre>
{`import { Tabs, TabList, Tab, TabPanel } from 'bfd-ui/lib/Tabs'

export default React.createClass({

  getInitialState() {
    return {
      tabs: [{
        name: '新建页签A'
      }, {
        name: '新建页签B'
      }]  
    }
  },

  handleClose(index) {
    const tabs = this.state.tabs
    tabs.splice(index, 1)
    this.setState({ tabs, activeIndex: tabs.length - 1 })
  },

  handleAdd(e) {
    e.preventDefault()
    const tabs = this.state.tabs
    tabs.push({
      name: '新建页签' + String.fromCharCode((67 + Math.random() * 24).toFixed(0))
    })
    this.setState({ tabs, activeIndex: tabs.length - 1 })
  },

  handleChange(activeIndex) {
    this.setState({ activeIndex })
  },

  render() {
    return (
      <Tabs dynamic handleClose={this.handleClose} activeIndex={this.state.activeIndex} onChange={this.handleChange}>
        <TabList>
          {this.state.tabs.map((tab, i) => <Tab key={i}>{tab.name}</Tab>)}
          <li>
            <a href="" onClick={this.handleAdd}>+</a>
          </li>
        </TabList>
        {this.state.tabs.map((tab, i) => <TabPanel key={i}>{'我是' + tab.name}</TabPanel>)}
      </Tabs>
    )
  }
})`}
        </Pre>

        <Tabs dynamic handleClose={this.handleClose} activeIndex={this.state.activeIndex} onChange={this.handleChange}>
          <TabList>
            {this.state.tabs.map((tab, i) => <Tab key={i}>{tab.name}</Tab>)}
            <li>
              <a href="" onClick={this.handleAdd}>+</a>
            </li>
          </TabList>
          {this.state.tabs.map((tab, i) => <TabPanel key={i}>{'我是' + tab.name}</TabPanel>)}
        </Tabs>

        <h2>Tabs</h2>
        <Props>
          <Prop name="dynamic" type="Boolean">
            <p>是否开启可关闭模式，并切换不同的选项卡样式</p>
          </Prop>
          <Prop name="handleClose" type="Function">
            <p>Tab 关闭事件处理，参数(index, key)</p>
          </Prop>
          <Prop name="activeIndex" type="Number">
            <p>指定（索引值）某个 Tab 处于 active 状态</p>
          </Prop>
          <Prop name="activeKey" type="String">
            <p>Tabs 默认以索引来管理 active 的状态，但是你也可以给每个 Tab 以及 TabPanel 绑定 "id"，这里用 activeKey 表示，然后管理 Tabs 的 activeKey 状态来控制选项卡的 active 状态</p>
          </Prop>
          <Prop name="onChange" type="Function">
            <p>Tab 切换后的回调，参数(index, key)</p>
          </Prop>
        </Props>

        <h2>Tab</h2>
        <Props>
          <Prop name="abolishClose" type="Boolean">
            <p>当 Tabs 为 dynamic 时，是否取消关闭按钮，默认有关闭按钮</p>
          </Prop>
          <Prop name="activeKey" type="String">
            <p>绑定 key，适用于 Tabs 以 activeKey 作为 active 的标识</p>
          </Prop>
        </Props>

        <h2>TabPanel</h2>
        <Props>
          <Prop name="activeKey" type="String">
            <p>与 Tab 相同</p>
          </Prop>
        </Props>
      </div>
    )
  }
})