import React, { PropTypes } from 'react'
import TreeNode from './TreeNode'
import classnames from 'classnames'
import './less/tree.less'

const propTypes = {
  data: PropTypes.array.isRequired
}

const Tree = React.createClass({

  loopData(data, parentLocation) {
    if (!data || !data.length) return null
    return (
      <ul>
      {data.map((item, i) => {
        const location = parentLocation.concat([i])
        return (
          <TreeNode location={location} key={i} open={item.open} parent={data} item={item} beforeNode={this.props.beforeNode}>
            {this.loopData(item.children, location)}
          </TreeNode>
        )
      })}
      </ul>
    )
  },

  render() {
    return (
      <div className={classnames('bfd-tree', this.props.className)}>{this.loopData(this.props.data, [])}</div>
    )
  }
})

Tree.propTypes = propTypes

export default Tree