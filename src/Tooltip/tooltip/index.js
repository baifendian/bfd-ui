/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import './index.less'
import React, { Component } from 'react'
import { render } from 'react-dom'
import classlist from 'classlist'

class Tooltip extends Component {

  constructor() {
    super()
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    this.setPosition()
  }

  componentDidUpdate() {
    this.setPosition()
  }

  setPosition() {
    if (this.state.show) {
      const tooltip = this.refs.tooltip
      const tooltipRect = tooltip.getBoundingClientRect()
      const triggerRect = this.state.trigger.getBoundingClientRect()
      const arrowHeight = 10
      const tooltipHeight = tooltipRect.height + arrowHeight
      const scrollTop = this.getDocumentScrollTop()

      const left = triggerRect.left - tooltipRect.width / 2 + triggerRect.width / 2 + 'px'
      let top
      let direction
      if (triggerRect.top > tooltipHeight) {
        direction = 'up'
        top = triggerRect.top - tooltipHeight + scrollTop + 'px'
      } else {
        direction = 'down'
        top = triggerRect.top + triggerRect.height + arrowHeight + scrollTop + 'px'
      }
      classlist(tooltip).add(`bfd-tooltip--${direction}`)
      tooltip.style.left = left
      tooltip.style.top = top
    }
  }

  getDocumentScrollTop() {
    return document.documentElement && document.documentElement.scrollTop || document.body.scrollTop
  }

  open(trigger, content) {
    this.setState({
      show: true,
      trigger,
      content
    })
  }

  close() {
    this.state.show && this.setState({show: false})
  }

  handleMouseEnter() {
    this.clearCloseTimer()
  }

  handleMouseLeave() {
    this.registerCloseTimer(setTimeout(() => {
      this.close()
    }, 150))
  }

  registerCloseTimer(timer) {
    this.closeTimer = timer
  }

  clearCloseTimer() {
    clearTimeout(this.closeTimer)
  }

  render() {
    const { show, content } = this.state
    return show && (
      <div
        ref="tooltip"
        className="bfd-tooltip"
        onMouseEnter={::this.handleMouseEnter}
        onMouseLeave={::this.handleMouseLeave}
      >
        {content}
      </div>
    )
  }
}

let instance

function tooltip(content, trigger) {

  if (!instance) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance = render(<Tooltip />, container)
  }

  instance.open(trigger, content)
}

tooltip.registerCloseTimer = timer => {
  instance && instance.registerCloseTimer(timer)
}

tooltip.clearCloseTimer = () => {
  instance && instance.clearCloseTimer()
}

tooltip.close = () => {
  instance && instance.close()
}

export default tooltip
