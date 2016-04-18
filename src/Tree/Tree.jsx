import React, { PropTypes } from 'react'
import TreeNode from './TreeNode'
import update from 'react-addons-update'
import classnames from 'classnames'
import './less/tree.less'

const propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func
}

const Tree = React.createClass({

  handleToggle(props, isOpen) {
    const { location, item, parent } = props
    const index = location.pop()
    parent[index] = update(item, {
      open: {$set: isOpen}
    })
    this.props.onChange && this.props.onChange(this.props.data, parent[index])
  },
  
  loopData(data, parentLocation) {
    if (!data || !data.length) return null
    return (
      <ul>
      {data.map((item, i) => {
        const location = parentLocation.concat([i])
        return (
          <TreeNode location={location} key={i} open={item.open} parent={data} item={item} beforeNode={this.props.beforeNode} onToggle={this.handleToggle}>
            {this.loopData(item.children, location)}
          </TreeNode>
        )
      })}
      </ul>
    )
  },

  render() {
    const { className, data, ...other } = this.props
    return (
      <div className={classnames('bfd-tree', className)} {...other}>{this.loopData(data, [])}</div>
    )
  }
})

Tree.propTypes = propTypes

export default Tree