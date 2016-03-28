import React, { PropTypes } from 'react'
import classNames from 'classnames'
import './main.less'


/**
 * 选项卡根节点，管理当前选项卡的全局状态
 */
const Tabs = React.createClass({

  propTypes: {
    dynamic: PropTypes.bool,
    handleClose: PropTypes.func,
    activeIndex: PropTypes.number,
    onChange: PropTypes.func
  },

  getInitialState() {
    return {
      tabCount: 0,
      panelCount: 0,
      activeIndex: this.props.avtiveIndex || 0
    }
  },

  childContextTypes: {
    getTabCount: PropTypes.func,
    reduceTabCount: PropTypes.func,
    getPanelCount: PropTypes.func,
    reducePanelCount: PropTypes.func,
    getActiveIndex: PropTypes.func,
    setActiveIndex: PropTypes.func,
    isDynamic: PropTypes.bool,
    handleClose: PropTypes.func
  },

  getChildContext() {
    return {
      isDynamic: !!this.props.dynamic,
      getTabCount: () => this.state.tabCount++,
      reduceTabCount: () => {
        this.setState({tabCount: this.state.tabCount - 1})
      },
      getPanelCount: () => this.state.panelCount++,
      reducePanelCount: () => {
        this.setState({panelCount: this.state.panelCount - 1})
      },
      getActiveIndex: () => this.state.activeIndex,
      setActiveIndex: activeIndex => {
        this.setState({ activeIndex })
        this.props.onChange && this.props.onChange(activeIndex)
      },
      handleClose: index => {
        this.props.handleClose && this.props.handleClose(index)  
      }
    }
  },

  componentWillReceiveProps(nextProps) {
    'activeIndex' in this.props && this.setState({activeIndex: nextProps.activeIndex})  
  },

  render() {
    return <div className={classNames('bfd-tabs', {dynamic: this.props.dynamic})}>{this.props.children}</div>
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

  contextTypes: {
    getTabCount: PropTypes.func,
    reduceTabCount: PropTypes.func,
    getActiveIndex: PropTypes.func,
    setActiveIndex: PropTypes.func,
    isDynamic: PropTypes.bool,
    handleClose: PropTypes.func
  },

  getInitialState() {
    return {
      index: this.context.getTabCount()
    }
  },

  handleClick(e) {
    e.preventDefault()
    this.context.setActiveIndex(this.state.index)
  },

  handleClose(e) {
    e.preventDefault()
    e.stopPropagation()
    this.context.handleClose(this.state.index)
  },

  componentWillUnmount() {
    this.context.reduceTabCount()
  },

  render() {
    return (
      <li className={classNames({'active': this.state.index === this.context.getActiveIndex()})}>
        <a href="" onClick={this.handleClick}>
          {this.props.children}
          {this.context.isDynamic ? <button type="button" onClick={this.handleClose}>x</button> : null}
        </a>
      </li>
    )
  }
})


/**
 * 内容节点
 */
const TabPanel = React.createClass({

  contextTypes: {
    getPanelCount: PropTypes.func,
    reducePanelCount: PropTypes.func,
    getActiveIndex: PropTypes.func
  },

  getInitialState() {
    return {
      index: this.context.getPanelCount()
    }
  },

  componentWillUnmount() {
    this.context.reducePanelCount()
  },

  render() {
    return <div className={classNames('tab-panel', {'active': this.state.index === this.context.getActiveIndex()})}>{this.props.children}</div>
  }
})

export { Tabs, TabList, Tab, TabPanel }