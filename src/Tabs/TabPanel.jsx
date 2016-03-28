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
    return <div className={classNames('tab-panel', {'active': this.state.index === this.context.tabs.state.activeIndex})}>{this.props.children}</div>
  }
})

TabPanel.contextTypes = contextTypes

export default TabPanel