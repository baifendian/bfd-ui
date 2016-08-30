import './index.less'
import React, { Component } from 'react'
import classnames from 'classnames'
import warning from 'warning'

class AnimateView extends Component {

  componentDidMount() {
    const node = this.refs.node
    setTimeout(() => {
      if (this.isVisible(node)) {
        node.className = classnames(node.className, 'active')
      } else {

      }
    }, 0)
  }

  isVisible(el) {
    let top = el.offsetTop
    let left = el.offsetLeft
    const width = el.offsetWidth
    const height = el.offsetHeight

    while(el.offsetParent) {
      el = el.offsetParent
      top += el.offsetTop
      left += el.offsetLeft
    }

    return (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      (top + height) <= (window.pageYOffset + window.innerHeight) &&
      (left + width) <= (window.pageXOffset + window.innerWidth)
    )
  }

  render() {
    const { children, type } = this.props
    if (process.env.NODE_ENV !== 'production') {
      warning(!children.length, 'Children should be single, check the children of AnimateView')
    }
    return React.cloneElement(children, {
      ref: 'node',
      className: classnames(children.className, type)
    })
  }
}

export default AnimateView