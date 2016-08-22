import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'

/**
 * 选项卡根节点
 */
class Tabs extends Component {

  constructor(props) {
    super()
    this.state = {
      tabCount: 0,
      panelCount: 0,
      activeIndex: props.activeIndex || 0,
      activeKey: props.activeKey
    }
  }

  getChildContext() {
    return {
      tabs: this
    }
  }

  componentWillReceiveProps(nextProps) {
    'activeIndex' in this.props && this.setState({activeIndex: nextProps.activeIndex})
    'activeKey' in this.props && this.setState({activeKey: nextProps.activeKey})
  }

  render() {
    const { className, children, dynamic, ...other } = this.props
    return (
      <div className={classNames('bfd-tabs', {
        'bfd-tabs--dynamic': dynamic
      }, className)} {...other}>
        {children}
      </div>
    ) 
  }
}

Tabs.childContextTypes = {
  tabs: PropTypes.instanceOf(Tabs)
}

Tabs.propTypes = {

  // 指定（索引值）某个 Tab 处于 active 状态
  activeIndex: PropTypes.number,

  // Tabs 默认以索引来管理 active 的状态，但是你也可以给每个 Tab 以及 TabPanel 绑定 "id"，这里用 activeKey 表示，然后管理 Tabs 的 activeKey 状态来控制选项卡的 active 状态
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // Tab 切换后的回调，参数(index, key)
  onChange: PropTypes.func,

  // 是否开启可关闭模式，并切换不同的选项卡样式
  dynamic: PropTypes.bool,

  // Tab 关闭事件处理，参数(index, key)
  handleClose: PropTypes.func,
  
  customProp(props) {
    if ('activeIndex' in props && 'activeKey' in props) {
      return new Error('`activeIndex` and `activeKey` can\'t exist at the same time')
    }
  }
}

export default Tabs