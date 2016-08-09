/**
 * Created by tenglong.jiang on 2016-05-13.
 */

import 'bfd-bootstrap'
import './main.less'
import React from 'react'
import ClearableInput from '../ClearableInput'
import classnames from 'classnames'

export default React.createClass({

  value: '',

  propTypes: {
    onSearch: React.PropTypes.func.isRequired
  },

  handleChange(v) {
    this.value = v
    this.props.onChange && this.props.onChange(v)
  },

  handleClick() {
    if (typeof this.props.onSearch == 'function') {
      this.props.onSearch(this.value)
    }
  },

  render() {
    const {
      className,
      ...other
    } = this.props
    const size = this.props.size || 'lg'
    this.value = this.props.defaultValue || ''
    return (
      <div className={classnames('bfd-search_input', className, size)} {...other}>        
        <ClearableInput defaultValue={this.value} size={size} onChange={this.handleChange} inline placeholder={this.props.placeholder || ''}/>
        <button className={classnames('btn btn-primary', size)} type="button" onClick={this.handleClick}>
          <span className="glyphicon glyphicon-search"></span>
          {this.props.label || '搜索'} 
        </button>
      </div>
    )
  }
})