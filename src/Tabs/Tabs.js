/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Tabs/Tabs.js
 */

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

/**
 * 选项卡根节点
 */
class Tabs extends Component {

  constructor(props) {
    super()
    this.state = {
      activeIndex: props.activeIndex || 0
    }
  }

  getChildContext() {
    return {
      tabs: this
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('activeIndex' in this.props) {
      this.setState({activeIndex: nextProps.activeIndex})
    }
  }

  render() {
    const { className, children, dynamic, ...other } = this.props
    this.tabCount = this.panelCount = 0
    return (
      <div className={classNames('bfd-tabs', {
        'bfd-tabs--dynamic': dynamic
      }, className)} {...other}>
        {children}
      </div>
    ) 
  }
}

Tabs.childContextTypes = {
  tabs: PropTypes.instanceOf(Tabs)
}

Tabs.propTypes = {

  // 指定（索引值）某个 Tab 处于 active 状态
  activeIndex: PropTypes.number,

  // Tabs 默认以索引来管理 active 的状态，但是你也可以给每个 Tab 以及 TabPanel 绑定 "id"，这里用 activeKey 表示，然后管理 Tabs 的 activeKey 状态来控制选项卡的 active 状态
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // Tab 切换后的回调，参数(index, key)
  onChange: PropTypes.func,

  // 是否开启可关闭模式，并切换不同的选项卡样式
  dynamic: PropTypes.bool,

  // Tab 关闭事件处理，参数(index, key)
  handleClose: PropTypes.func,
  
  customProp(props) {
    if ('activeIndex' in props && 'activeKey' in props) {
      return new Error('`activeIndex` and `activeKey` can\'t exist at the same time')
    }
  }
}

export default Tabs