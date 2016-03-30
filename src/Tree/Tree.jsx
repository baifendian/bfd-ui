import React from 'react'
import TreeNode from './TreeNode'
import './tree.less'

const Tree = React.createClass({
  render() {
    if (!this.props.data || !this.props.data.length) return null
    return (
      <div className="bfd-tree">
        <ul>
        {this.props.data.map((item, i) => <TreeNode key={i} data={item}></TreeNode>)}
        </ul>
      </div>
    )
  }
})

export default Tree