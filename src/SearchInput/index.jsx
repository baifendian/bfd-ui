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
    if(!v) {
      this.handleClick()
    }
  },
  handleClick() {
    if(typeof this.props.onSearch == 'function') {
      this.props.onSearch(this.value);
    }
  },
  render() {
    return (
      <div className={classnames('bfd-search_input', this.props.className)}>        
        <ClearableInput onChange={this.handleChange} inline placeholder={this.props.placeholder || '' }/>
        <button className="btn btn-primary" type="button" onClick={this.handleClick}>
          <span className="glyphicon glyphicon-search"></span>
          搜索 
        </button>
      </div>
    )
  }
})