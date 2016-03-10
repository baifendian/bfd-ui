/**
 * 文档封装
 */

import React from 'react'
import './less/props.less'

const Props = React.createClass({
  render() {
    return (
      <div className="props">
        <h2>{this.props.title || '属性'}</h2>
        <ul>{this.props.children}</ul>
      </div>
    )
  }
})

const Prop = React.createClass({
  render() {
    return (
      <li className="api">
        <span className="name">{this.props.name}</span>
        <span className="type">{this.props.type}</span>
        <p>{this.props.desc}</p>
        {this.props.children}
      </li>
    )
  }
})

export { Props, Prop }