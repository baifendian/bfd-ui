/**
 * Created by tenglong.jiang on 2016-05-13.
 */

import 'bfd-bootstrap'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './main.less'

class Slider extends Component {

  constructor(props) {
    super()
    this.isDown = false
    this.width = 0
    this.offsetLeft = 0
    this.marginLeft = 0
    this.sliderWidth = 0
    this.mouseMoveFn = null
    this.mouseUpFn = null
  }

  componentDidMount() {
    const bar = this.refs.bar
    const selectedBar = this.refs.selectedBar
    const slider = this.refs.slider

    const style = getComputedStyle(bar)
    const sliderStyle = getComputedStyle(slider)
    const defaultValue = this.props.defaultValue || this.props.start || 0

    this.width = parseInt(style.width, 10)
    this.sliderWidth = parseInt(sliderStyle.width, 10)
    this.offsetLeft = bar.offsetLeft + this.marginLeft
    slider.style.left = this.getTickValue(defaultValue) - parseInt(sliderStyle.width) / 2 + 'px'
    selectedBar.style.width = this.getTickValue(defaultValue) + 'px'

    this.refs.msg.innerHTML = defaultValue + (this.props.suffix || '')
  }

  componentWillUnmount() {

  }

  render() {
    const { className, ...other } = this.props
    return (
      <div ref="container" className={classnames('bfd-seekbar', className)} {...other}>
        <div ref="bar" className="bar">
          <div ref="slider" className="slider" onMouseDown={::this.handleMouseDown}>
            <div ref="tip" className="tooltips">
              <span ref="msg" className="text">0{this.props.suffix || ''}</span>
              <div className="arrow-down"></div>
            </div>
          </div>
          <div ref="selectedBar" className="selected"></div>
          <Scale start={this.props.start || 0} end={this.props.end} tickValue={this.props.tickValue}/>       
        </div>
      </div>
    )
  }

  handleMouseDown(event) {
    event.stopPropagation()
    this.isDown = true
    const BODY = document.body
    this.mouseMoveFn = ::this.handleMouseMove
    this.mouseUpFn = ::this.handleMouseUp
    BODY.addEventListener('mousemove', this.mouseMoveFn)
    BODY.addEventListener('mouseup', this.mouseUpFn)
  }

  handleMouseMove(event) {
    const slider = this.refs.slider
    const selectedBar = this.refs.selectedBar

    if (this.isDown) {
      let left = event.pageX - this.offsetLeft - this.sliderWidth / 4
      if (left <= 0) {
        left = 0
        selectedBar.style.width = left + 'px'
      } else if (left >= (this.width - this.sliderWidth / 2)) {
        left = this.width - this.sliderWidth / 2
        selectedBar.style.width = this.width + 'px'
      } else {
        selectedBar.style.width = left + 'px'
      }
      slider.style.left = left + 'px'
      const text = this.getValue(parseInt(selectedBar.style.width, 10))
      this.refs.msg.innerHTML = text + (this.props.suffix || '')
      if (typeof this.props.onSliding == 'function') {
        this.props.onSliding(text)
      }
    }
  }

  handleMouseUp() {
    const selectedBar = this.refs.selectedBar
    if (typeof selectedBar == 'undefined') {
      return
    }
    this.isDown = false
    const text = this.getValue(parseInt(selectedBar.style.width, 10))
    if (typeof this.props.onSlid == 'function') {
      this.props.onSlid(text)
    }

    const BODY = document.body
    BODY.removeEventListener('mousemove', this.mouseMoveFn)
    BODY.removeEventListener('mouseup', this.mouseUpFn)
  }

  getValue(currWidth) {
    const end = this.props.end
    const start = this.props.start || 0
    const v = Math.abs(end - start)
    const width = this.width
    const value = v * currWidth / width + start
    let digit = 0
    if (end <= 10) {
      digit = 1
    }
    return value.toFixed(digit)
  }

  getTickValue(value) {
    const end = this.props.end
    const start = this.props.start || 0
    const v = Math.abs(end) - Math.abs(start)
    v == 0 ? 1 : v
    const width = this.width
    return width / v * value
  }
}

Slider.propTypes = {
  end: React.PropTypes.number.isRequired
}

class Scale extends Component {

  constructor(props) {
    super()
  }

  componentWillMount() {
    this.tickValue = this.props.tickValue || 5
  }

  render() {
    const rows = []    
    for (let i = 0; i <= this.tickValue; i++) {
      rows.push(<div key={i} ref={'t'+i} className="tick"><div></div>{i}</div>)
    }

    return (
      <div ref="container" className={classnames('bfd-scale', this.props.className)}>
        {rows}
      </div>
    )
  }

  componentDidMount() {
    const container = this.refs.container
    const containerStyle = getComputedStyle(container)
    const width = parseInt(containerStyle.width)
    const scope = this.props.end - (this.props.start || 0)
    this.width = width
    this.scope = scope
    const arr = this.getTick(this.tickValue)
    arr.map((tick, index) => {
      let value = scope / width * tick + this.props.start
      if (index == 0) {
        value = this.props.start
      }
      if (index == arr.length - 1) {
        value = this.props.end
      }

      const el = this.refs['t' + index]
      el.innerHTML = '<div></div>' + parseInt(value)
      if (index == 0) {
        el.style.left = 4 + 'px'
      } else if (index == this.tickValue) {
        el.style.left = parseInt(tick) - 1 + 'px'
      } else {
        el.style.left = tick + 'px'
      }
    })
  }

  getTick(num) {
    const arr = []
    num = !num ? 1 : num
    const w = this.width / num
    for (let i = 0; i < num; i++) {
      arr.push(i * w)
    }
    arr.push(this.width)

    return arr
  }
}

Slider.propTypes = {

  // 默认值
  defaultValue: PropTypes.number,

  // 标尺刻度数量，默认5
  tickValue: PropTypes.number,

  // 起始值，默认值为0
  start: PropTypes.number,

  // 结束值
  end: PropTypes.number.isRequired,

  // 后缀
  suffix: PropTypes.string.isRequired,

  // 滑块拖动进行时事件，value为拖动条当前值
  onSliding: PropTypes.func,

  // 滑块拖动完成时事件，即鼠标抬起后执行，value为拖动条当前值
  onSlid: PropTypes.func.isRequired
}

export default Slider