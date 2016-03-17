/**
 * 文档封装
 */

import React from 'react'
import './less/props.less'

const Props = React.createClass({
  render() {
    return (
      <div className="props">
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
          {'required' in this.props ? <span>required</span> : <span>optional</span>}
        </div>
        <div>{this.props.children}</div>
      </li>
    )
  }
})

export { Props, Prop }