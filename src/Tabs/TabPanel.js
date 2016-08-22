import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

/**
 * 内容节点
 */
class TabPanel extends Component {
  render() {
    const { className, children, activeKey, activeIndex, ...other } = this.props
    const tabs = this.context.tabs
    const index = tabs.panelCount++

    if (tabs.props.activeKey) {
      warning(activeKey, 'You set `activeKey` for Tabs but no `activeKey` for Tab')
    }
    let isActive
    if (activeKey) {
      isActive = activeKey === tabs.props.activeKey
    } else {
      isActive = index === tabs.state.activeIndex
    }
    if (isActive) {
      this.children = children
    }
    return (
      <div className={classNames('bfd-tabs__panel', {
        'bfd-tabs__panel--active': isActive
      }, className)} {...other}>
        {isActive ? children : this.children}
      </div>
    )
  }
}

TabPanel.contextTypes = {
  tabs: PropTypes.object
}

TabPanel.propTypes = {
  // 与 Tabs activeKey 对应
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default TabPanel