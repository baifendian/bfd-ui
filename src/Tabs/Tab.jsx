import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Tabs from './Tabs'

const contextTypes = {
  tabs: PropTypes.instanceOf(Tabs)
}

/**
 * 选项卡自身节点
 */
const Tab = React.createClass({

  getInitialState() {
    return {
      index: this.context.tabs.state.tabCount
    }
  },

  componentWillMount() {
    this.context.tabs.state.tabCount++
  },

  componentWillUnmount() {
    this.context.tabs.state.tabCount--
  },

  handleClick(e) {
    e.preventDefault()
    this.context.tabs.setState({activeIndex: this.state.index})
  },

  handleClose(e) {
    e.preventDefault()
    e.stopPropagation()
    const handleClose = this.context.tabs.props.handleClose
    handleClose && handleClose(this.state.index)
  },

  render() {
    return (
      <li className={classNames({'active': this.state.index === this.context.tabs.state.activeIndex})}>
        <a href="" onClick={this.handleClick}>
          {this.props.children}
          {this.context.tabs.props.dynamic ? <button type="button" onClick={this.handleClose}>x</button> : null}
        </a>
      </li>
    )
  }
})

Tab.contextTypes = contextTypes

export default Tab