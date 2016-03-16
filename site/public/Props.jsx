/**
 * 文档封装
 */

import React from 'react'
import './less/props.less'

const Props = React.createClass({
  render() {
    return (
      <div className="props">
        <h4>{this.props.title || '属性'}</h4>
        <ul>{this.props.children}</ul>
      </div>
    )
  }
})

const Prop = React.createClass({
  render() {
    return (
      <li>
        <div className="common">
          <span className="name">{this.props.name}</span>
          <span className="type">{this.props.type}</span>
          {'required' in this.props ? <span>required</span> : null}
        </div>
        <div>{this.props.children}</div>
      </li>
    )
  }
})

export { Props, Prop }