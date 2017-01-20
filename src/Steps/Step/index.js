/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import Icon from '../../Icon'
import classnames from 'classnames'

class Line extends Component {
  render() {
    const width = this.props.width
    const height = this.props.height
    const index = this.props.index
    const current = this.props.current
    const max = this.props.max
    const w = width >= height ? height : width
    const y = (height / 2) - (height / 4) - 10
    const radius = w / 4

    const leftLineStyle = {
      left: '0px',
      top: Math.floor(y + radius) + 'px',
      width: (width / 2) + 'px',
      float: 'left'
    }

    const rightLineStyle = {
      left: width / 2 + radius + 'px',
      top: Math.floor(y + radius) + 'px',
      width: (width / 2) + 'px'
    }

    let classNameLeft = 'bfd-steps__box--line_wait'
    let classNameRight = 'bfd-steps__box--line_wait'
    if (index < current) {
      classNameLeft = 'bfd-steps__box--line_finish'
      classNameRight = 'bfd-steps__box--line_finish'
    } else if (index == current) {
      classNameLeft = 'bfd-steps__box--line_finish'
      classNameRight = 'bfd-steps__box--line_wait'
    }

    if (index == 0) {
      classNameLeft = 'bfd-steps__box--line_hide'
    }
    if (index == max - 1) {
      classNameRight = 'bfd-steps__box--line_hide'
    }

    return (
      <div>
        <div style={leftLineStyle} className={classnames('bfd-steps__box--line', classNameLeft)}></div>
        <div style={rightLineStyle} className={classnames('bfd-steps__box--line', classNameRight)}></div>
      </div>
    )
  }
}

class Title extends Component {
  render() {
    const title = this.props.title
    const index = this.props.index
    const current = this.props.current
    const height = this.props.height
    const y = (height / 2) - (height / 4) - 10
    const top = y * 2 + 'px'
    let className = 'bfd-steps__box--title_process'
    if (index < current) {
      className = 'bfd-steps__box--title_finish'
    } else if (index > current) {
      className = 'bfd-steps__box--title_wait'
    }
    return (<div style={{top}} className={classnames('bfd-steps__box--title', className)}>{title}</div>)
  }
}

class Circle extends Component {

  render() {
    const width = this.props.width
    const height = this.props.height
    const index = this.props.index
    const current = this.props.current
    const icon = this.props.icon
    const w = width >= height ? height : width
    const x = (width / 2) - (w / 4)
    const y = (height / 2) - (height / 4) - 10
    const radius = w / 4
    const fontSize = radius
    const style = {
      width: (w / 2) + 'px',
      height: (w / 2) + 'px',
      left: x + 'px',
      top: y + 'px',
      borderRadius: radius + 'px',
      fontSize: fontSize + 'px',
      lineHeight: (w / 2 - 2) + 'px'
    }

    let NavIcon = index + 1
    if (icon) {
      NavIcon = <Icon type={icon} />
    }

    let className = 'bfd-steps__box--circle_process'
    if (index < current) {
      className = 'bfd-steps__box--circle_finish'
    } else if (index > current) {
      className = 'bfd-steps__box--circle_wait'
    }

    return (<div style={style} onClick={::this.handleClick} className={classnames('bfd-steps__box--circle', className)}>{NavIcon}</div>)
  }

  handleClick() {
    const index = this.props.index
    const title = this.props.title
    this.props.onStep && this.props.onStep(index, title)
  }
}

class Step extends Component {
  render() {
    const style = {
      width: this.props.width + 'px',
      height: this.props.height + 'px'
    }
    const { className, title, icon, ...other} = this.props

    return (
      <div style={style} className="bfd-steps__box" {...other}>
        <Line {...this.props} />
        <Circle {...this.props} />
        <Title {...this.props} />
      </div>
    )
  }
}

Step.propTypes = {

  // 标题
  title: PropTypes.string,

  // 图标，http://fontawesome.io/icons/
  icon: PropTypes.string
}

export default Step
