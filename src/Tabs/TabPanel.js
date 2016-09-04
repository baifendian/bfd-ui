/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Tabs/TabPanel.js
 */

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import warning from 'warning'

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