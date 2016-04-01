import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Tabs from './Tabs'

const contextTypes = {
  tabs: PropTypes.instanceOf(Tabs)
}

/**
 * 内容节点
 */
const TabPanel = React.createClass({

  getInitialState() {
    return {
      index: this.context.tabs.state.panelCount
    }
  },

  componentWillMount() {
    this.context.tabs.state.panelCount++
  },

  componentWillUnmount() {
    this.context.tabs.state.panelCount--
  },

  render() {
    if (this.context.tabs.state.activeKey) {
      if (!this.props.activeKey) {
        throw new Error('既然 Tabs 采用 activeKey 方式，请给 TabPanel 组件 绑定 activeKey')
      }
    }
    let isActive
    if (this.props.activeKey) {
      isActive = this.props.activeKey === this.context.tabs.state.activeKey
    } else {
      isActive = this.state.index === this.context.tabs.state.activeIndex
    }
    return <div className={classNames('tab-panel', {active: isActive})}>{this.props.children}</div>
  }
})

TabPanel.contextTypes = contextTypes

export default TabPanel