import React, { PropTypes } from 'react'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './less/props.less'

// function Props({ children }) {
//   return (
//     <div className="props">
//       <ul>{children}</ul>
//     </div>
//   )
// }

function Props({ children }) {
  return (
    <table className="table props">
      <thead>
        <tr>
          <th>属性</th>
          <th>类型</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

// function Prop(props) {
//   return (
//     <li>
//       <div className="common">
//         <span className="name">{props.name}</span>
//         <span className="type">{props.type}</span>
//         {'required' in props ? <span>required</span> : <span>optional</span>}
//       </div>
//       <div>{props.children}</div>
//     </li>
//   )
// }

function Prop(props) {
  const { name, type, children, deprecated, required } = props
  return (
    <tr>
      <td className={classnames('name', { deprecated, required })}>{name}</td>
      <td className="type">{type.toLowerCase()}</td>
      <td>{children}</td>
    </tr>
  )
}

Prop.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool
}

Prop.defaultProps = {
  type: ''
}

export { Props, Prop }