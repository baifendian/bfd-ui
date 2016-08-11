/**
 * Created by tenglong.jiang on 2016-03-30.
 */

import React, { Component, PropTypes } from 'react'
import 'bfd-bootstrap'
import './main.less'

class SearchBar extends Component {

  constructor(props) {
    super()
  }
  
  render() {
    return (
      <div>
        <span className="search glyphicon glyphicon-search"></span>
        <input 
          placeholder="请输入搜索内容"
          ref="filterTextInput"
          onChange={::this.handleChange} />
      </div>
    )
  }

  handleChange() {
    const v = this.refs.filterTextInput.value
    this.props.onUserInput(v)
  }
}

export default SearchBar