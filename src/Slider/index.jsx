/**
 * Created by tenglong.jiang on 2016-05-13.
 */

import 'bfd-bootstrap'
import './main.less'
import React from 'react'
import classnames from 'classnames'

export default React.createClass({
  isDown: false,
  width: 0,
  offsetLeft: 0,
  marginLeft: 0,
  sliderWidth: 0,
  propTypes: {
    end: React.PropTypes.number.isRequired
  },
  handleMouseDown(event) {
    event.stopPropagation()
    this.isDown = true
    const BODY = document.body
    BODY.addEventListener('mousemove', this.handleMouseMove)
    BODY.addEventListener('mouseup', this.handleMouseUp)
  },
  handleMouseMove(event) {
    const slider = this.refs.slider
    const selectedBar = this.refs.selectedBar

    if(this.isDown) {
      let left = event.pageX - this.offsetLeft
      if(left <= 0) {
        left = 0
        slider.style.left = left + 'px'
        selectedBar.style.width = left + 'px'
      } else if(left >= (this.width - this.sliderWidth/2)) {

        left = this.width - this.sliderWidth/2
        selectedBar.style.width = this.width + 'px'
      } else {
        slider.style.left = left + 'px'        
        selectedBar.style.width = left + 'px'
      }
      const text = this.getValue(parseInt(selectedBar.style.width, 10))
      this.refs.msg.innerHTML = text + (this.props.suffix || '')
      if(typeof this.props.onSliding == 'function') {
        this.props.onSliding(text)
      }
    }
  },
  handleMouseUp() {
    const selectedBar = this.refs.selectedBar
    if(typeof selectedBar == 'undefined') {
      return;
    }
    this.isDown = false
    const text = this.getValue(parseInt(selectedBar.style.width, 10))
    if(typeof this.props.onSlid == 'function') {
      this.props.onSlid(text)
    }

    const BODY = document.body
    BODY.removeEventListener('mousemove', this.handleMouseMove)
    BODY.removeEventListener('mouseup', this.handleMouseUp)
  },
  getValue(currWidth) {
    const end = this.props.end
    const start = this.props.start || 0
    const v = Math.abs(end - start)
    const width = this.width
    const value = v * currWidth / width + start
    let digit = 0
    if(end <= 10) {
      digit = 1
    }
    return value.toFixed(digit)
  },
  getTickValue(value) {
    const end = this.props.end
    const start = this.props.start || 0
    const v = Math.abs(end) - Math.abs(start)
    v == 0 ? 1 : v
    const width = this.width
    return width / v * value
  },
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
    slider.style.left = this.getTickValue(defaultValue) - parseInt(sliderStyle.width)/2 + 'px'
    selectedBar.style.width = this.getTickValue(defaultValue) + 'px'
    
    this.refs.msg.innerHTML = defaultValue + (this.props.suffix || '')

    
  },
  componentWillUnmount() {
    
  },
  render() {
    return (
      <div ref="container" className={classnames('bfd-seekbar', this.props.className)}>
        <div ref="bar" className="bar">
          <div ref="slider" className="slider" onMouseDown={this.handleMouseDown}>
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
})

const Scale = React.createClass({
  componentWillMount() {
    this.tickValue = this.props.tickValue || 5
  },
  render() {    
    const rows = []
    for(let i=0; i<=(this.tickValue); i++) {
      rows.push(<div key={i} ref={'t'+i} className="tick"><div></div>{i}</div>)
    }
    return (
      <div ref="container" className={classnames('bfd-scale', this.props.className)}>
        {rows}
      </div>
    )
  },
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
      if(index == 0) {
        value = this.props.start
      }
      if(index == arr.length - 1) {
        value = this.props.end
      }

      const el = this.refs['t'+index]
      el.innerHTML = '<div></div>'+ parseInt(value)
      const style = getComputedStyle(el)      
      const textWidth = parseInt(style.width)
      if(index == 0) {
        el.style.left = tick + 'px'
      } else if(index == this.tickValue) {
        el.style.left = parseInt(tick - textWidth/2) - 1 + 'px'
      } else {
        el.style.left = tick - textWidth/2 + 'px'
      }
    })
  },
  getTick(num) {
    const arr = []
    num = !num ? 1 : num
    const w = this.width / num
    for(let i=0; i<num; i++) {     
      arr.push(i * w)
    }
    arr.push(this.width)
    return arr
  }
})