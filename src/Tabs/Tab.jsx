import React, { PropTypes } from 'react'
import classNames from 'classnames'
import warning from 'warning'
import Tabs from './Tabs'

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
    const tabs = this.context.tabs
    tabs.setState({activeIndex: this.state.index})
    if (this.props.activeKey) {
      tabs.setState({activeKey: this.props.activeKey})
    }
    tabs.props.onChange && tabs.props.onChange(this.state.index, this.props.activeKey)
  },

  handleClose(e) {
    e.preventDefault()
    e.stopPropagation()
    const handleClose = this.context.tabs.props.handleClose
    handleClose && handleClose(this.state.index, this.props.activeKey)
  },

  render() {
    if (this.context.tabs.state.activeKey) {
      warning(this.props.activeKey, 'No `activeKey`')
    }
    let isActive
    if (this.props.activeKey) {
      isActive = this.props.activeKey === this.context.tabs.state.activeKey
    } else {
      isActive = this.state.index === this.context.tabs.state.activeIndex
    }
    return (
      <li className={classNames({active: isActive})}>
        <a href="" onClick={this.handleClick}>
          {this.props.children}
          {
            this.context.tabs.props.dynamic && !this.props.abolishClose ? 
            <button type="button" onClick={this.handleClose}>x</button> : 
            null
          }
        </a>
      </li>
    )
  }
})

Tab.contextTypes = {
  tabs: PropTypes.instanceOf(Tabs)
}

export default Tab