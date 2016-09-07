/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Nav extends Component {

  getChildContext() {
    return {
      nav: this
    }
  }

  handleItemClick(props, e) {
    this.props.onItemClick && this.props.onItemClick(props, e)
  }
  
  render() {
    const { children, className, href, onItemClick,  ...other } = this.props
    return (
      <div className={classnames('bfd-nav', className)} {...other}>
        <ul>{children}</ul>
      </div>
    )
  }
}

Nav.childContextTypes = {
  nav: PropTypes.instanceOf(Nav)
}

Nav.propTypes = {

  // 所有 NavItem 的基础 href
  href: PropTypes.string,

  // 叶子节点 NavItem 点击事件，参数为当前 NavItem 的 props 以及 event 对象
  onItemClick: PropTypes.func
}

export default Nav