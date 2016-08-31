import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import warning from 'warning'
import Button from '../Button'

/**
 * 选项卡自身节点
 */
class Tab extends Component {

  handleClick(index, e) {
    e.preventDefault()
    const tabs = this.context.tabs
    tabs.setState({activeIndex: index})
    if (this.props.activeKey) {
      tabs.setState({activeKey: this.props.activeKey})
    }
    tabs.props.onChange && tabs.props.onChange(index, this.props.activeKey)
  }

  handleClose(index, e) {
    e.preventDefault()
    e.stopPropagation()
    const _handleClose = this.context.tabs.props.handleClose
    _handleClose && _handleClose(index, this.props.activeKey)
  }

  render() {
    const { className, children, activeKey, activeIndex, abolishClose, ...other } = this.props
    const tabs = this.context.tabs
    const index = tabs.tabCount++
    
    if (tabs.props.activeKey) {
      warning(activeKey, 'You set `activeKey` for Tabs but no `activeKey` for Tab')
    }
    let isActive
    if (activeKey) {
      isActive = activeKey === tabs.props.activeKey
    } else {
      isActive = index === tabs.state.activeIndex
    }
    return (
      <li className={classNames('bfd-tabs__tab', {
        'bfd-tabs__tab--active': isActive
      }, className)} {...other}>
        <a href="" onClick={this.handleClick.bind(this, index)}>
          <span className="bfd-tabs__tab-content">{children}</span>
          {
            tabs.props.dynamic && !abolishClose && (
              <Button 
                transparent 
                icon="remove" 
                size="sm"
                className="bfd-tabs__tab-remove" 
                onClick={this.handleClose.bind(this, index)} 
              />
            )
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