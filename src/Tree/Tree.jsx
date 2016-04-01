import React, { PropTypes } from 'react'
import TreeNode from './TreeNode'
import './tree.less'

const propTypes = {
  data: PropTypes.array.isRequired
}

const Tree = React.createClass({

  loopData(data, parentLocation) {
    if (!data || !data.length) return null
    return (
      <ul>
      {data.map((item, i) => {
        const location = [...parentLocation, i]
        return (
          <TreeNode location={location} key={i} open={item.open} parent={data} item={item} nodeRender={this.props.nodeRender}>
            {this.loopData(item.children, location)}
          </TreeNode>
        )
      })}
      </ul>
    )
  },

  render() {
    return (
      <div className="bfd-tree">{this.loopData(this.props.data, 0, [])}</div>
    )
  }
})

Tree.propTypes = propTypes

export default Tree