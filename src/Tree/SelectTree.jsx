import React, { PropTypes } from 'react'
import Tree from './Tree'
import { Checkbox } from '../Checkbox'
import update from 'react-addons-update'
import classnames from 'classnames'
import './less/selectTree.less'

const SelectTree = React.createClass({

  handleSelect(instance, e) {

    e.stopPropagation()
    
    const isChecked = e.target.checked
    const children = instance.state.children
    this.syncChildren(children, isChecked)
    
    instance.set('checked', isChecked)

    while (instance = instance.props.parent) {
      const isChecked = !instance.state.children.filter(item => !item.checked).length
      instance.set('checked', isChecked)
    }
    
    this.props.onChange && this.props.onChange(this.props.data)
  },

  syncChildren(children, isChecked) {
    children && children.forEach((child, i) => {
      children[i] = update(child, {
        checked: {$set: isChecked}
      })
      this.syncChildren(child.children, isChecked)
    })
  },

  render() {
    const { className, ...other } = this.props
    other.beforeNodeRender = instance => {
      return (
        <Checkbox checked={instance.state.checked || false} onChange={this.handleSelect.bind(this, instance)} />
      )
    }
    return <Tree className={classnames('bfd-select-tree', className)} {...other} />
  }
})

// SelectTree.propTypes = propTypes

export default SelectTree