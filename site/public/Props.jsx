import React, { PropTypes } from 'react'
import './less/props.less'

function Props({ children }) {
  return (
    <div className="props">
      <ul>{children}</ul>
    </div>
  )
}

function Prop(props) {
  return (
    <li>
      <div className="common">
        <span className="name">{props.name}</span>
        <span className="type">{props.type}</span>
        {'required' in props ? <span>required</span> : <span>optional</span>}
      </div>
      <div>{props.children}</div>
    </li>
  )
}

Prop.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool
}

export { Props, Prop }