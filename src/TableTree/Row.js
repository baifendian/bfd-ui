import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Icon from '../Icon'
import './Row.less'

class Row extends Component {

  handleToggle() {
    const data = this.props.data
    data.open = !data.open
    this.props.onChange()
  }

  render() {
    const { data, hidden, path, columns } = this.props
    const hasChildren = data.children && data.children.length
    const classNames = classnames('bfd-table-tree-row', {
      hidden,
      open: data.open
    })
    return (
      <tr className={classNames}>
        <td>
          <div className="tree-node" style={{marginLeft: (path.length - 1) / 2 * 20 + 'px'}}>
            <Icon 
              style={{visibility: hasChildren ? 'visible' : 'hidden'}}
              className="icon-toggle"
              type="caret-right" 
              onClick={this.handleToggle.bind(this)}
            />
            {columns[0].render ? columns[0].render(data, path) : data[columns[0].key]}
          </div>
        </td>
        {columns.slice(1).map((column, i) => {
          return <td key={i}>{column.render ? column.render(data, path) : data[column.key]}</td>
        })}
      </tr>
    )
  }
}

export default Row