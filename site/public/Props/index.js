import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const Props = props => {
  return (
    <div className="props">
      <h2>{'<' + props.tag + ' />'}</h2>
      <table>
        <thead>
          <tr>
            <th>属性</th>
            <th>类型</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  )
}

const Prop = props => {
  const { name, type, children, required } = props
  return (
    <tr>
      <td className={classnames('props__prop-name', {
        'props__prop-name--required': required
      })}>
        {name}
      </td>
      <td className="props__prop-type">{type}</td>
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