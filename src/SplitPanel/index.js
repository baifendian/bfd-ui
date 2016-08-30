/**
 * Created by tenglong.jiang on 2016-05-13.
 */

import React, { Component, PropTypes } from 'react'
import findAllByType from '../findAllByType'
import classnames from 'classnames'
import './index.less'

class SubSplitPanel extends Component {

  constructor(props) {
    super()
  }

  render() {
    const { children, className, ...other } = this.props
    return (
      <div className={classnames(className)} {...other}>
        {children}
      </div>
    )
  }
}

class SplitPanel extends Component {

  constructor(props) {
    super()
    this.width = 0
    this.height = 0
    this.offsetLeft = 0
    this.offsetTop = 0
    this.clientX = 0
    this.clientY = 0
    this.oldSplit= {
      width: 0,
      height: 0,
      width1: 0,
      height1: 0
    }
    this.currSplit= {
      width: 0,
      height: 0,
      width1: 0,
      height1: 0
    }
    this.down = false
    this.mouseMoveFn = null
    this.mouseUpFn = null
  }

  handleMouseDown(event) {
    event.stopPropagation()
    this.down = true
    const direct = this.props.direct
    const line = this.refs.line
    const BODY = document.body
    this.clientX = event.clientX
    this.clientY = event.clientY
    line.left = line.offsetLeft
    line.top = line.offsetTop
    const top = this.refs.top
    const bottom = this.refs.bottom
    this.oldSplit.width = parseInt(top.style.width)
    this.oldSplit.height = parseInt(top.style.height)
    this.oldSplit.width1 = parseInt(bottom.style.width)
    this.oldSplit.height1 = parseInt(bottom.style.height)

    if(direct == 'ver') {
      this.mouseMoveFn = ::this.handleMouseLRMove
    } else {
      this.mouseMoveFn = ::this.handleMouseUDMove
    }
    this.mouseUpFn = ::this.handleMouseUp
    BODY.addEventListener('mousemove', this.mouseMoveFn)
    BODY.addEventListener('mouseup', this.mouseUpFn)
  }

  handleMouseUDMove(event) {
    if(!this.down) {
      return
    }
    const container = this.refs.container
    const top = this.refs.top
    const bottom = this.refs.bottom
    const line = this.refs.line
    const lineStyle = getComputedStyle(line)
    let scope = line.top + event.clientY - this.clientY
    const maxScope = container.clientHeight - line.offsetHeight
    line.style.margin = 0
    if (scope < 0) {
      scope = 0
    }
    if (scope > maxScope) {
      scope = maxScope
    }
    line.style.top = top.style.height = scope + 'px'
    bottom.style.height = container.clientHeight - parseInt(lineStyle.height) - scope + 'px'
    return false
  }

  handleMouseLRMove(event) {
    if(!this.down) {
      return
    }
    const container = this.refs.container
    const top = this.refs.top
    const bottom = this.refs.bottom
    const line = this.refs.line
    const lineStyle = getComputedStyle(line)
    let scope = line.left + event.clientX - this.clientX
    const maxScope = container.clientWidth - line.offsetWidth
    line.style.margin = 0
    if (scope < 0) {
      scope = 0
    }
    if (scope > maxScope) {
      scope = maxScope
    }
    line.style.left = top.style.width = scope + 'px'
    bottom.style.width = container.clientWidth - scope - parseInt(lineStyle.width) + 'px'
    return false
  }

  handleMouseUp() {
    const direct = this.props.direct
    const BODY = document.body
    const top = this.refs.top
    const bottom = this.refs.bottom
    this.currSplit.width = parseInt(top.style.width)
    this.currSplit.height = parseInt(top.style.height)
    this.currSplit.width1 = parseInt(bottom.style.width)
    this.currSplit.height1 = parseInt(bottom.style.height)
    if (typeof this.props.onSplit == 'function') {
      const old = this.oldSplit
      const curr = this.currSplit
      if (direct == 'ver') {
        typeof this.props.onSplit(old.width, old.width1, curr.width, curr.width1)
      } else {
        typeof this.props.onSplit(old.height, old.height1, curr.height, curr.height1)
      }
    }
    this.down = false
    BODY.removeEventListener('mousemove', this.mouseMoveFn)
    BODY.removeEventListener('mouseup', this.mouseUpFn)

    return false
  }

  render() {
    const {
      children,
      className,
      ...other
    } = this.props
    delete other.direct
    delete other.onSplit
    const items = findAllByType(children, SubSplitPanel)
    const direct = this.props.direct
    const lineClassName = direct == 'ver' ? 'bfd-split-panel__verline' : 'bfd-split-panel__horline'
    const topStyle = direct == 'ver' ? {
      float: 'left'
    } : {}
    const bottomStyle = direct == 'ver' ? {
      float: 'right'
    } : {}
    return (
      <div ref="container" className={classnames('bfd-split-panel', className)} {...other}>
        <div ref="top" style={topStyle} className="bfd-split-panel--top">{items[0]}</div>
        <div ref="line" className={lineClassName} onMouseDown={::this.handleMouseDown}></div>
        <div ref="bottom" style={bottomStyle} className="bfd-split-panel--bottom">{items[1]}</div>
      </div>
    )
  }

  componentDidMount() {
    const items = findAllByType(this.props.children, SubSplitPanel)
    const container = this.refs.container
    const top = this.refs.top
    const bottom = this.refs.bottom
    const line = this.refs.line
    const style = getComputedStyle(container)
    const lineStyle = getComputedStyle(line)
    const direct = this.props.direct
    const containerHeight = container.offsetHeight
    const containerWidth = container.offsetWidth
    container.style.width = containerWidth + 'px'
    container.style.height = containerHeight + 'px'

    if (direct == 'ver') {
      top.style.height = '100%'
      bottom.style.height = '100%'
      const width = items[0].props.width || containerWidth / 2
      top.style.width = width + 'px'
      line.style.left = width + 'px'
      bottom.style.width = containerWidth - width - parseInt(lineStyle.width) - parseInt(style.borderWidth) - 1 + 'px'
    } else {
      top.style.width = '100%'
      bottom.style.width = '100%'
      const height = items[0].props.height || containerHeight / 2
      top.style.height = height + 'px'
      line.style.top = height + 'px'
      bottom.style.height = containerHeight - height - parseInt(lineStyle.height) - parseInt(style.borderWidth) + 'px'
    }
  }
}

SplitPanel.propTypes = {

  // 分栏方向，分为水平分栏（hor）和垂直分栏（ver）两种
  direct: PropTypes.string.isRequired,

  // 分栏拖动事件，当属性direct=ver，返回四个参数为oldWidth、oldWidth1（代表两栏原宽度）和width1、width2（代表两栏当前宽度），当属性direct=hor，返回四个参数为oldHeight、oldHeight2（代表两栏原高度）和height1、height2（代表两栏当前高度）
  onSplit: PropTypes.func,
  customProp({
    direct
  }) {
    if (!direct) {
      return new Error('direct必填属性。')
    }
  }
}

SubSplitPanel.propTypes = {

  // 左栏宽度，当容器属性direct=ver时有效
  width: PropTypes.number,

  // 上栏高度，当容器属性direct=hor时有效
  height: PropTypes.number
}

export {
  SplitPanel,
  SubSplitPanel
}