/**
 * Demo 面板
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Pre from '../Pre'
import Icon from 'c/Icon'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './index.less'

export default React.createClass({

  getInitialState() {
    return {
      open: false     
    }
  },

  componentDidMount() {
    this.codeHeight = ReactDOM.findDOMNode(this.refs.pre).offsetHeight
  },

  handleToggle() {
    this.setState({open: !this.state.open})
  },

  render() {
    const { className, title, code, children } = this.props
    return (
      <div className={classnames('panel panel-default panel-demo', className)}>
        <div className="panel-heading">
          <span>{title}</span>
          <button className="pull-right" onClick={this.handleToggle}>
            <Icon type="code"></Icon>
          </button>
        </div>
        <div className={classnames('code clearfix', {open: this.state.open})} style={{height: (this.state.open ? this.codeHeight : 0) + 'px'}}>
          <Pre ref="pre">{code}</Pre>
        </div>
        <div className="panel-body">
          {children}
        </div>
      </div>
    )
  }
})