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

  constructor(props) {
    super()
    this.state = {
      open: props.open
    }
  }

  getChildContext() {
    return {
      popoverContent: this
    }
  }

  componentDidMount() {
    this.rootNode = ReactDOM.findDOMNode(this)
    this.state.open && this.setPosition()
  }

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({open: nextProps.open})
  }

  componentDidUpdate() {
    this.state.open && this.setPosition()
  }

  setPosition() {
    const { triggerNode, direction, align } = this.props

    // Prevent accumulation
    if (this.positionClassNames) {
      classlist(this.rootNode).remove(...this.positionClassNames.split(' '))
    }
    const [computedDirection, computedAlign] = CoordinateFactory(
      triggerNode, this.rootNode, direction, align
    )
    this.positionClassNames = classnames({
      [`bfd-popover--${computedDirection}`]: true,
      [`bfd-popover--align-${computedAlign}`]: !!computedAlign
    })
    classlist(this.rootNode).add(this.positionClassNames)
  }

  /**
   * @public
   */
  close() {
    this.setState({open: false})
  }

  render() {
    const {
      children, className, triggerNode, triggerMode, direction, align, ...other
    } = this.props
    const { open } = this.state
    delete other.open
    return (
      <div className={classnames('bfd-popover', {
        'bfd-popover--open': open,
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
