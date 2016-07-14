import React, { PropTypes } from 'react'
import { findAllByType } from '../util/ReactUtils'
import classnames from 'classnames'
import './index.less'
const Panel = React.createClass({
  render() {
    const {children, className, ...other} = this.props
    return (
      <div className={classnames(className)} {...other}>
        {children}
      </div>
    )
  }
})
const SplitPanel = React.createClass({

  width: 0,

  height: 0,

  offsetLeft: 0,

  offsetTop: 0,

  clientX : 0,

  clientY : 0,
  getInitialState() {
    return {
          
    }
  },

  handleMouseDown(event) {
    event.stopPropagation()
    const direct = this.props.direct
    const line = this.refs.line
    const BODY = document.body
    this.clientX = event.clientX
    this.clientY = event.clientY
    line.left = line.offsetLeft
    line.top = line.offsetTop
    BODY.addEventListener('mousemove', direct == 'ver' ? this.handleMouseLRMove : this.handleMouseUDMove)
    BODY.addEventListener('mouseup', this.handleMouseUp)
  },
  handleMouseUDMove(event) {
    const container = this.refs.container
    const top = this.refs.top
    const bottom = this.refs.bottom
    const line = this.refs.line
    const lineStyle = getComputedStyle(line)
    let scope = line.top + event.clientY - this.clientY
    const maxScope = container.clientHeight - line.offsetHeight
    line.style.margin = 0
    if(scope < 0) {
      scope = 0
    }
    if(scope > maxScope) {
      scope = maxScope
    }
    line.style.top = top.style.height = scope + 'px'
    bottom.style.height = container.clientHeight - parseInt(lineStyle.height) - scope + 'px'
    return false
  },
  handleMouseLRMove(event) {    
    const container = this.refs.container
    const top = this.refs.top
    const bottom = this.refs.bottom
    const line = this.refs.line
    const lineStyle = getComputedStyle(line)
    let scope = line.left + event.clientX - this.clientX
    const maxScope = container.clientWidth - line.offsetWidth
    line.style.margin = 0
    if(scope < 0) {
      scope = 0
    }
    if(scope > maxScope) {
      scope = maxScope
    }
    line.style.left = top.style.width = scope + 'px'
    bottom.style.width = container.clientWidth - scope - parseInt(lineStyle.width) + 'px'
    return false
  },
  handleMouseUp() {
    const direct = this.props.direct
    const BODY = document.body
    const line = this.refs.line
    line.setCapture && line.setCapture()
    BODY.removeEventListener('mousemove', direct == 'ver' ? this.handleMouseLRMove : this.handleMouseUDMove)
    BODY.removeEventListener('mouseup', this.handleMouseUp)
    return false
  },

  render() {
    const rows = []
    const {children, className, ...other} = this.props
    const items = findAllByType(children, Panel)
    const direct = this.props.direct
    const lineClassName = direct == 'ver' ? 'verline' : 'horline'
    const bottomStyle = direct == 'ver' ? {float: 'right'} : {}
    return (
      <div ref="container" className={classnames('bfd-split-panel', className)} {...other}>
        <div ref="top" className="top">{items[0]}</div>
        <div ref="line" className={lineClassName} onMouseDown={this.handleMouseDown}></div>
        <div ref="bottom" style={bottomStyle} className="bottom">{items[1]}</div>
      </div>
    )
  },

  componentDidMount() {
    const items = findAllByType(this.props.children, Panel)
    const container = this.refs.container
    const top = this.refs.top
    const bottom = this.refs.bottom
    const line = this.refs.line
    const style = getComputedStyle(container)
    const lineStyle = getComputedStyle(line)
    const direct = this.props.direct
    container.style.width = this.props.width + 'px'
    container.style.height = this.props.height + 'px'
    if(direct == 'ver') {
      top.style.height = '100%'
      bottom.style.height = '100%'
      const width = items[0].props.width || this.props.width / 2
      top.style.width = width + 'px'
      line.style.left = width + 'px'
      bottom.style.width = this.props.width - width - parseInt(lineStyle.width) - parseInt(style.borderWidth) - 1 + 'px'
    } else {
      top.style.width = '100%'
      bottom.style.width = '100%'
      const height = items[0].props.height || this.props.height / 2
      top.style.height = height + 'px'
      line.style.top = height + 'px'
      bottom.style.height = this.props.height - height - parseInt(lineStyle.height) - parseInt(style.borderWidth) + 'px'
    }    
  }
})

SplitPanel.propTypes = {
  direct: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,  
  customProp({ direct, width, height }) {
    if (!(direct && width && height)) {
      return new Error('direct、width、height均为必填属性。')
    }
  }
}

export {
  SplitPanel,
  Panel
}