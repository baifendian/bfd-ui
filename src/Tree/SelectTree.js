import React, { Component, PropTypes } from 'react'
import Tree from './Tree'
import { Checkbox } from '../Checkbox'
import update from 'react-addons-update'
import classnames from 'classnames'
import './less/selectTree.less'

class SelectTree extends Component {

  handleSelect() {

  }

  render() {
    const { className, ...other } = this.props
    other.beforeNodeRender = data => {
      return (
        <Checkbox 
          checked={data.checked || false} 
          onChange={this.handleSelect.bind(this)} 
        />
      )
    }
    return <Tree className={classnames('bfd-select-tree', className)} {...other} />
  }
}

export default SelectTree