import React, { PropTypes } from 'react'
import classNames from 'classnames'
import './main.less'


/**
 * 选项卡根节点，管理当前选项卡的全局状态
 */
const Tabs = React.createClass({

  getInitialState() {
    return {
      tabIndex: 0,
      panelIndex: 0,
      currentIndex: 0
    }
  },

  childContextTypes: {
    getTabIndex: PropTypes.func,
    getPanelIndex: PropTypes.func,
    getCurrentIndex: PropTypes.func,
    setCurrentIndex: PropTypes.func
  },

  getChildContext() {
    return {
      getTabIndex: () => this.state.tabIndex++,
      getPanelIndex: () => this.state.panelIndex++,
      getCurrentIndex: () => this.state.currentIndex,
      setCurrentIndex: currentIndex => {
        this.setState({currentIndex})
      }
    }
  },

  render() {
    return <div className="tabs">{this.props.children}</div>
  }
})


/**
 * 选项组容器节点
 */
const TabList = React.createClass({

  render() {
    return <ul className="nav nav-tabs">{this.props.children}</ul>
  }
})


/**
 * 选项卡自身节点
 */
const Tab = React.createClass({

  getInitialState() {
    return {
      index: this.context.getTabIndex()
    }
  },

  contextTypes: {
    getTabIndex: PropTypes.func,
    getCurrentIndex: PropTypes.func,
    setCurrentIndex: PropTypes.func
  },

  handleClick(e) {
    e.preventDefault()
    this.context.setCurrentIndex(this.state.index)
  },

  render() {
    return (
      <li className={classNames({'active': this.state.index === this.context.getCurrentIndex()})}>
        <a href="" onClick={this.handleClick}>{this.props.children}</a>
      </li>
    )
  }
})


/**
 * 内容节点
 */
const TabPanel = React.createClass({

  getInitialState() {
    return {
      index: this.context.getPanelIndex()
    }
  },

  contextTypes: {
    getPanelIndex: PropTypes.func,
    getCurrentIndex: PropTypes.func
  },

  render() {
    return <div className={classNames('tab-panel', {'active': this.state.index === this.context.getCurrentIndex()})}>{this.props.children}</div>
  }
})

export { Tabs, TabList, Tab, TabPanel }