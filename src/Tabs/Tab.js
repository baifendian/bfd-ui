import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import warning from 'warning'
import Button from '../Button'

/**
 * 选项卡自身节点
 */
class Tab extends Component {

  constructor(props, context) {
    super()
    this.state = {
      index: context.tabs.state.tabCount
    }
  }

  componentWillMount() {
    this.context.tabs.state.tabCount++
  }

  componentWillUnmount() {
    this.context.tabs.state.tabCount--
  }

  handleClick(e) {
    e.preventDefault()
    const tabs = this.context.tabs
    tabs.setState({activeIndex: this.state.index})
    if (this.props.activeKey) {
      tabs.setState({activeKey: this.props.activeKey})
    }
    tabs.props.onChange && tabs.props.onChange(this.state.index, this.props.activeKey)
  }

  handleClose(e) {
    e.preventDefault()
    e.stopPropagation()
    const _handleClose = this.context.tabs.props.handleClose
    _handleClose && _handleClose(this.state.index, this.props.activeKey)
  }

  render() {
    const { className, children, activeKey, abolishClose, ...other } = this.props
    const { index } = this.state
    const tabs = this.context.tabs
    if (tabs.state.activeKey) {
      warning(activeKey, 'You set `activeKey` for Tabs but no `activeKey` for Tab')
    }
    let isActive
    if (activeKey) {
      isActive = activeKey === tabs.state.activeKey
    } else {
      isActive = index === tabs.state.activeIndex
    }
    return (
      <li className={classNames('bfd-tabs__tab', {
        'bfd-tabs__tab--active': isActive
      }, className)} {...other}>
        <a href="" onClick={::this.handleClick}>
          <span className="bfd-tabs__tab-content">{children}</span>
          {
            tabs.props.dynamic && !abolishClose &&
            <Button 
              transparent 
              icon="remove" 
              size="sm"
              className="bfd-tabs__tab-close" 
              onClick={::this.handleClose} 
            />
          }
        </a>
      </li>
    )
  }
}

Tab.contextTypes = {
  tabs: PropTypes.object
}

Tab.propTypes = {

  // 与 Tabs activeKey 对应
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 当 Tabs 为 dynamic 时，是否取消关闭按钮
  abolishClose: PropTypes.bool
}

export default Tab