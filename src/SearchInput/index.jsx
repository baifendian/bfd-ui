/**
 * Created by tenglong.jiang on 2016-05-13.
 */

import 'bfd-bootstrap'
import './main.less'
import React from 'react'
import classnames from 'classnames'

export default React.createClass({
  propTypes: {
    onSearch: React.PropTypes.func.isRequired
  },
  handleClick() {
    const v = this.refs.searchInput.value
    if(typeof this.props.onSearch == 'function') {
      this.props.onSearch(v);
    }
  },
  render() {
    return (
      <div className={classnames('bfd-search_input', this.props.className)}>
        <div className="input-group">
            <input type="text" className="form-control" ref="searchInput" placeholder={this.props.placeholder || '' } />
            <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={this.handleClick}>
                  <span className="glyphicon glyphicon-search"></span>
                  搜索 
                </button>
            </span>
        </div>
      </div>
    )
  }
})