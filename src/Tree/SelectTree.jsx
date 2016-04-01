import React, { PropTypes } from 'react'
import Tree from './Tree'
import { Checkbox } from '../Checkbox'
import update from 'react-addons-update'

const propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

const SelectTree = React.createClass({

  handleChange(item, location, parent, e) {
    
    const isChecked = e.target.checked
    const index = location.pop()
    parent[index] = update(item, {
      checked: {$set: isChecked}
    })

    this.syncChildren(item.children, isChecked)
    this.syncParents(location)
    
    this.props.onChange(this.props.data, parent[index])
  },

  // 父节点切换选择后，所有子节点状态保持同步
  syncChildren(children, isChecked) {
    children && children.forEach((child, i) => {
      children[i] = update(child, {
        checked: {$set: isChecked}
      })
      this.syncChildren(child.children, isChecked)
    })
  },
  
  // 同步父级状态
  syncParents(location) {

    if (!location.length) return
    
    const data = this.props.data
    const parents = []
    let temp = data
    for (let i = 0; i < location.length; i++) {
      const parent = temp
      const index = location[i]
      parents.push({
        index,
        parent: temp,
        target: temp[index]
      })
      temp = temp[index].children
    }

    // 子节点是否全部选中，更新父节点选中状态
    for (let i = parents.length; i--; ) {
      const { parent, index, target } = parents[i]
      parent[index] = update(target, {
        checked: {$set: !target.children.filter(child => !child.checked).length}
      })
    }
  },

  render() {
    const { children, ...other } = this.props
    other.nodeRender = props => {
      const { item, location, parent } = props
      return (
        <Checkbox checked={item.checked} onChange={this.handleChange.bind(this, item, location, parent)}>
          {item.name}
        </Checkbox>
      )
    }
    return <Tree {...other} />
  }
})

SelectTree.propTypes = propTypes

export default SelectTree