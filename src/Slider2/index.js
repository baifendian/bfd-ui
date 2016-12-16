import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Popover from '../Popover'
import controlledPropValidator from '../_shared/propValidator/controlled'
import extendValidator from '../_shared/propValidator/extend'
import './index.less'

class Slider2 extends Component {

  constructor(props) {
    super()
    this.value = ('value' in props ? props.value : props.defaultValue) || 0
    this.handleDragging = ::this.handleDragging
    this.handleDragEnd = ::this.handleDragEnd
  }

  componentDidMount() {
    this.prepareState()
    this.popover = new Popover(() => {
      return {
        triggerNode: this.sliderNode,
        onMouseEnter: () => {
          clearTimeout(this.closeTimer)
        },
        onMouseLeave: () => {
          if (!this.dragging) {
            this.closeTimer = setTimeout(::this.popover.close, 150)
          }
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && (this.value = nextProps.value)
  }

  componentDidUpdate() {
    this.prepareState()
  }

  prepareState() {
    const { min, max, step } = this.props
    this.pageX = this.layerNode.getBoundingClientRect().left
    this.width = this.layerNode.offsetWidth
    this.stepCount = (max - min) / step
    this.stepIndex = Math.round((this.value - min) / step)
    this.stepWidth = this.width / this.stepCount
    this.updatePosition()
  }

  handleDragStart(e) {
    if (e.button === 0) {
      if (this.props.disabled) return
      this.dragging = true
      e.preventDefault()
      window.addEventListener('mousemove', this.handleDragging)
      window.addEventListener('mouseup', this.handleDragEnd)
    }
  }

  handleDragging(e) {
    const prevValue = this.value
    const value = this.onSliderChange(e)
    if (prevValue !== value) {
      this.props.onDragging && this.props.onDragging(value)
    }
  }

  handleDragEnd(e) {
    this.dragging = false
    window.removeEventListener('mousemove', this.handleDragging)
    window.removeEventListener('mouseup', this.handleDragEnd)
    if (e.target !== this.sliderNode) {
      this.handleDragLeave()
    }
    this.props.onChange && this.props.onChange(this.value)
    this.isDragEnd = true
  }

  handleDragEnter() {
    clearTimeout(this.closeTimer)
    this.openTimer = setTimeout(() => {
      this.popover.open()
      this.updateTip()
    }, 150)
  }

  handleDragLeave() {
    if (!this.dragging) {
      clearTimeout(this.openTimer)
      this.closeTimer = setTimeout(::this.popover.close, 150)
    }
  }

  handleClick(e) {
    if (this.isDragEnd) {
      this.isDragEnd = false
      return
    }
    if (this.props.disabled) return
    this.popover.open()
    this.onSliderChange(e)
    this.props.onChange && this.props.onChange(this.value)

    // If the mouse position outside the slider trigger
    if (!this.rootNode) {
      this.rootNode = ReactDOM.findDOMNode(this)
    }
    const onMouseLeave = () => {
      this.handleDragLeave()
      this.rootNode.removeEventListener('mouseleave', onMouseLeave)
    }
    this.rootNode.addEventListener('mouseleave', onMouseLeave)
  }

  onSliderChange(e) {
    let offsetLeft = e.pageX - this.pageX
    if (offsetLeft > this.width) {
      offsetLeft = this.width
    } else if (offsetLeft < 0) {
      offsetLeft = 0
    }
    let stepIndex = Math.round(offsetLeft / this.stepWidth)
    if (this.stepIndex !== stepIndex) {
      this.stepIndex = stepIndex
      this.value = this.props.min + this.stepIndex * this.props.step
      this.updatePosition()
      this.updateTip()
    }
    return this.value
  }

  updatePosition() {
    const offsetLeft = (this.stepIndex / this.stepCount) * 100 + '%'
    this.sliderNode.style.left = offsetLeft
    this.rangeNode.style.width = offsetLeft
  }

  updateTip() {
    this.popover.render({
      content: this.props.formatter(this.value)
    })
  }

  render() {
    const {
      className, min, max, step, value, defaultValue, formatter, onDragging, onChange,
      disabled, ...other } = this.props
    return (
      <div
        className={classnames('bfd-slider2', {
          'bfd-slider2--disabled': disabled
        }, className)}
        onClick={::this.handleClick}
        {...other}
      >
        <div className="bfd-slider2__layer" ref={node => this.layerNode = node}>
          <div className="bfd-slider2__range" ref={node => this.rangeNode = node} />
          <div
            onClick={e => e.stopPropagation()}
            className="bfd-slider2__slider"
            onMouseDown={::this.handleDragStart}
            onMouseEnter={::this.handleDragEnter}
            onMouseLeave={::this.handleDragLeave}
            ref={node => this.sliderNode = node}
          />
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
