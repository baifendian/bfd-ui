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
import Popover from '../Popover'
import controlledPropValidator from '../_shared/propValidator/controlled'
import extendValidator from '../_shared/propValidator/extend'
import './index.less'

class Slider2 extends Component {

  constructor(props) {
    super()
    this.handleDragging = ::this.handleDragging
    this.handleDragEnd = ::this.handleDragEnd

    this.shouldPopoverToggle = true

    this.isSliderFromDrag = false
    this.isSliderFromClick = false

    this.state = {
      value: ('value' in props ? props.value : props.defaultValue) || 0
    }
  }

  componentDidMount() {
    this.componentDidRender()
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({value: nextProps.value})
  }

  componentDidUpdate() {
    this.componentDidRender()
  }

  handleDragStart(e) {
    if (e.button === 0) {
      if (this.props.disabled) {
        return
      }
      this.isSliderFromDrag = true
      this.isSliderFromClick = false
      this.shouldPopoverToggle = false
      e.preventDefault()
      window.addEventListener('mousemove', this.handleDragging)
      window.addEventListener('mouseup', this.handleDragEnd)
    }
  }

  handleDragging(e) {
    const value = this.mousePositionDidChange(e)
    if (typeof value === 'number') {
      this.props.onDragging && this.props.onDragging(value)
    }
  }

  handleDragEnd(e) {
    if (e.target === this.sliderNode) {
      this.isSliderFromDrag = false
    }
    this.shouldPopoverToggle = true
    window.removeEventListener('mousemove', this.handleDragging)
    window.removeEventListener('mouseup', this.handleDragEnd)
    this.props.onChange && this.props.onChange(this.state.value)
  }

  handleClick(e) {
    if (this.isSliderFromDrag) {
      this.isSliderFromDrag = false
      return
    }
    if (this.props.disabled) {
      return
    }
    const value = this.mousePositionDidChange(e)
    if (typeof value === 'number') {
      this.props.onChange && this.props.onChange(value)
    }
    this.updatePosition()
    this.popover.open()
    this.shouldPopoverToggle = false
    this.isSliderFromClick = true
  }

  handleMouseLeave() {
    if (this.isSliderFromClick) {
      this.shouldPopoverToggle = true
      this.isSliderFromClick = false
      this.popover.close()
    }
  }

  mousePositionDidChange(e) {
    let offsetLeft = e.pageX - this.pageX
    if (offsetLeft > this.width) {
      offsetLeft = this.width
    } else if (offsetLeft < 0) {
      offsetLeft = 0
    }
    const stepIndex = Math.round(offsetLeft / this.stepWidth)
    if (this.stepIndex !== stepIndex) {
      this.stepIndex = stepIndex
      const value = this.props.min + this.stepIndex * this.props.step
      this.setState({ value })
      return value
    }
  }

  componentDidRender() {
    if (!this.isSliderFromDrag && !this.isSliderFromClick) {
      this.prepareContext()
    }
    if (!this.isSliderFromClick) {
      this.updatePosition()
    }
  }

  prepareContext() {
    const { min, max, step } = this.props
    this.pageX = this.layerNode.getBoundingClientRect().left
    this.width = this.layerNode.offsetWidth
    this.stepCount = (max - min) / step
    this.stepWidth = this.width / this.stepCount
    this.stepIndex = Math.round((this.state.value - min) / step)
  }

  updatePosition() {
    const offsetLeft = (this.stepIndex / this.stepCount) * 100 + '%'
    this.sliderNode.style.left = offsetLeft
    this.rangeNode.style.width = offsetLeft
  }

  render() {
    const {
      className, min, max, step, value, defaultValue, formatter, onDragging, onChange,
      disabled, ...other
    } = this.props
    return (
      <div
        className={classnames('bfd-slider2', {
          'bfd-slider2--disabled': disabled
        }, className)}
        onClick={::this.handleClick}
        onMouseLeave={::this.handleMouseLeave}
        {...other}
      >
        <div className="bfd-slider2__layer" ref={node => this.layerNode = node}>
          <div className="bfd-slider2__range" ref={node => this.rangeNode = node} />
          <Popover
            content={formatter(this.state.value)}
            shouldOpen={() => this.shouldPopoverToggle}
            shouldClose={() => this.shouldPopoverToggle}
            ref={popover => this.popover = popover}
          >
            <div
              className="bfd-slider2__slider"
              onMouseDown={::this.handleDragStart}
              onMouseLeave={::this.handleMouseLeave}
              ref={node => this.sliderNode = node}
            />
          </Popover>
        </div>
      </div>
    )
  }
}

Slider2.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  formatter: value => value
}

Slider2.propTypes = {

  // 最小值，默认0
  min: PropTypes.number,

  // 最大值，默认100
  max: PropTypes.number,

  // 步长，默认1
  step: extendValidator(PropTypes.number, props => {
    if (props.step > props.max) return '`step` prop should not be greater than `max` prop.'
  }),

  // 值
  value: controlledPropValidator(PropTypes.number),

  // 同 value，不可控
  defaultValue: PropTypes.number,

  // 提示框内容格式器，默认 `formatter: value => value`
  formatter: PropTypes.func,

  // 拖动过程事件，参数为当前拖动条的值
  onDragging: PropTypes.func,

  // 拖动完成或点击后的回调，参数为当前拖动条的值
  onChange: PropTypes.func,

  // 是否禁用
  disabled: PropTypes.bool
}

export default Slider2
