/**
 * Created by tenglong.jiang on 2016-03-30.
 */

import 'bfd-bootstrap'
import './main.less'
import React from 'react'

export default React.createClass({
  handleChange() {
    const v = this.refs.filterTextInput.value
    this.props.onUserInput(v)
  },
  render() {
    return (
      <div>
        <span className="search glyphicon glyphicon-search"></span>
        <input 
          placeholder="请输入搜索内容"
          ref="filterTextInput"
          onChange={this.handleChange} />
      </div>
    )
  }
})