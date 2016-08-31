import './index.less'
import React from 'react'
import classnames from 'classnames'
import Button from '../../Button'

const Row = props => {
  const { data, onChange, hidden, path, columns } = props
  const hasChildren = data.children && data.children.length
  const classNames = classnames('bfd-table-tree__row', {
    'bfd-table-tree__row--hidden': hidden,
    'bfd-table-tree__row--open': data.open
  })
  return (
    <tr className={classNames}>
      <td>
        <div 
          className="bfd-table-tree__node" 
          style={{marginLeft: (path.length - 1) / 2 * 20 + 'px'}}>
          <Button 
            style={{visibility: hasChildren ? 'visible' : 'hidden'}}
            className="bfd-table-tree__node-toggle"
            icon="caret-right" 
            size="sm"
            transparent
            onClick={() => onChange('set', [...path, 'open'], !data.open)} 
          />
          <div className="bfd-table-tree__node-content">
            {columns[0].render ? columns[0].render(data, path) : data[columns[0].key]}
          </div>
        </div>
      </td>
      {columns.slice(1).map((column, i) => {
        return (
          <td key={i}>{column.render ? column.render(data, path) : data[column.key]}</td>
        )
      })}
    </tr>
  )
}

export default Row