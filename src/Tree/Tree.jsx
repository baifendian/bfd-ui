import React, { PropTypes } from 'react'
import TreeNode from './TreeNode'
import classnames from 'classnames'
import './less/tree.less'

const Tree = React.createClass({

  getInitialState() {
    return {
      data: this.props.data || this.props.defaultData
    }
  },

  componentWillReceiveProps(nextProps) {
    'data' in nextProps && this.setState({
      data: nextProps.data
    })
  },

  handleNodeChange() {
    this.props.onChange && this.props.onChange(this.state.data)
  },

  render() {
    const { className, beforeNodeRender, render, getIcon, ...other } = this.props
    const { ...treeNode } = { beforeNodeRender, render, getIcon }
    const data = this.state.data
    return (
      <div className={classnames('bfd-tree', className)} {...other}>
        <ul>
          {data.map((item, i) => {
            return (
              <TreeNode 
                key={i} 
                parentData={data} 
                index={i} 
                data={item} 
                onChange={this.handleNodeChange} 
                {...treeNode}
              />
            )
          })}
        </ul>
      </div>
    )
  }
})

Tree.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  render: PropTypes.func,
  getIcon: PropTypes.func
}

export default Tree