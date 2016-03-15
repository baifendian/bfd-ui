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
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>属性</th>
              <th>描述</th>
              <th>类型</th>
              <th>值</th>
              <th>是否必须</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>{this.props.children}</tbody>
        </table>
      </div>
    )
  }
})

const Prop = React.createClass({
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.desc}</td>
        <td>{this.props.type}</td>
        <td>{this.props.value}</td>
        <td>{'required' in this.props ? '是' : '否'}</td>
        <td>{this.props.default}</td>
      </tr>
    )
  }
})

export { Props, Prop }