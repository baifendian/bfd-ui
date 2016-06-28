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

  handleNodeActive(instance) {
    this.lastNode && this.lastNode.set('active', false)
    instance.set('active', true, () => {
      const dataPath = [instance.props.data]
      while (instance = instance.props.parent) {
        dataPath.unshift(instance.props.data)
      }
      this.props.onActive && this.props.onActive(dataPath)
    })
    this.lastNode = instance
  },

  render() {
    const { className, beforeNodeRender, render, getIcon, getUrl, ...other } = this.props
    const { ...treeNode } = { beforeNodeRender, render, getIcon, getUrl }
    const data = this.state.data
    return (
      <div className={classnames('bfd-tree', className, {activeable: other.onActive})} {...other}>
        <ul>
          {data.map((item, i) => {
            return (
              <TreeNode 
                key={i} 
                parentData={data} 
                index={i} 
                data={item} 
                onChange={this.handleNodeChange}
                onActive={this.handleNodeActive} 
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
  data: PropTypes.array,
  defaultData: PropTypes.array,
  onChange: PropTypes.func,
  onActive: PropTypes.func,
  render: PropTypes.func,
  getIcon: PropTypes.func,
  getUrl: PropTypes.func
}

export default Tree