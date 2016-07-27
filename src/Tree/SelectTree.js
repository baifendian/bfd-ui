import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Tree from './Tree'
import { Checkbox } from '../Checkbox'
import './less/selectTree.less'

class SelectTree extends Component {

  handleSelect(item, path, checked) {
    const data = this.refs.tree.updateData('set', ['data', ...path, 'checked'], checked)
    this.props.onSelect && this.props.onSelect(data, item, path, checked)
  }

  render() {
    const { className, ...other } = this.props
    other.beforeNodeRender = (data, path) => {
      return (
        <Checkbox 
          checked={data.checked || false} 
          onChange={e => this.handleSelect(data, path, e.target.checked)} 
        />
      )
    }
    return (
      <Tree 
        ref="tree" 
        className={classnames('bfd-select-tree', className)} 
        {...other} 
      />
    ) 
  }
}

SelectTree.propTypes = {
  onSelect: PropTypes.func
}

export default SelectTree