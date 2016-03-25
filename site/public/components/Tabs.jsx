import React from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'c/Tabs'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

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
  }
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
        
        <h2>可添加和关闭的</h2>

        <Pre>
{`import { Tabs, TabList, Tab, TabPanel } from 'bfd-ui/lib/Tabs'

const App = React.createClass({

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
            <p>Tab 关闭事件处理，参数为 Tab 的索引</p>
          </Prop>
          <Prop name="activeIndex" type="Number">
            <p>指定（索引值）某个 Tab 处于 active 状态</p>
          </Prop>
          <Prop name="onChange" type="Function">
            <p>Tab 切换后的回调，参数为 Tab 的索引</p>
          </Prop>
        </Props>
      </div>
    )
  }
})