import React, { PropTypes } from 'react'
import classNames from 'classnames'
import './tabs.less'

const propTypes = {
  dynamic: PropTypes.bool,
  handleClose: PropTypes.func,
  activeIndex: PropTypes.number,
  activeKey: PropTypes.string,
  onChange: PropTypes.func,
  customProp(props) {
    if ('activeIndex' in props && 'activeKey' in props) {
      return new Error('activeIndex 和 activeKey 只提供一个')
    }
    if ('activeKey' in props && !props.activeKey) {
      return new Error('默认 activeKey 不能为空')
    }
  }
}

/**
 * 选项卡根节点
 */
const Tabs = React.createClass({

  getInitialState() {
    return {
      tabCount: 0,
      panelCount: 0,
      activeIndex: this.props.activeIndex || 0,
      activeKey: this.props.activeKey
    }
  },

  getChildContext() {
    return {
      tabs: this
    }
  },

  componentWillReceiveProps(nextProps) {
    'activeIndex' in this.props && this.setState({activeIndex: nextProps.activeIndex})
    'activeKey' in this.props && this.setState({activeKey: nextProps.activeKey})
  },

  render() {
    return (
      <div className={classNames('bfd-tabs', {dynamic: this.props.dynamic})}>
        {this.props.children}
      </div>
    ) 
  }
})

Tabs.propTypes = propTypes

Tabs.childContextTypes = {
  tabs: PropTypes.instanceOf(Tabs)
}

export default Tabs