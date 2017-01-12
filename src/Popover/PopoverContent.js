/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import classlist from 'classlist'
import CoordinateFactory from './CoordinateFactory'

class PopoverContent extends Component {

  getChildContext() {
    return {
      popoverContent: this
    }
  }

  componentDidMount() {
    this.setPosition()
  }

  componentDidUpdate() {
    this.setPosition()
  }

  setPosition() {
    const { triggerNode, direction, align } = this.props
    const rootNode = ReactDOM.findDOMNode(this)
    rootNode.style.display = 'block'

    // Prevent accumulation
    if (this.positionClassNames) {
      classlist(rootNode).remove(...this.positionClassNames.split(' '))
    }
    const [computedDirection, computedAlign] = CoordinateFactory(
      triggerNode, rootNode, direction, align
    )
    this.positionClassNames = classnames({
      [`bfd-popover--${computedDirection}`]: true,
      [`bfd-popover--align-${computedAlign}`]: !!computedAlign
    })
    classlist(rootNode).add(this.positionClassNames)
  }

  render() {
    const {
      children, className, triggerNode, triggerMode, direction, align, ...other
    } = this.props
    return (
      <div className={classnames('bfd-popover', {
        'bfd-popover--animation': triggerMode === 'hover'
      }, className)} {...other}>
        <div className="bfd-popover__content">
          {children}
        </div>
      </div>
    )
  }
}

PopoverContent.childContextTypes = {
  popoverContent: PropTypes.instanceOf(PopoverContent)
}

export default PopoverContent
