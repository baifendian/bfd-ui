import React, { PropTypes } from 'react'
import classNames from 'classnames'

const propTypes = {
  dynamic: PropTypes.bool,
  handleClose: PropTypes.func,
  activeIndex: PropTypes.number,
  onChange: PropTypes.func
}

/**
 * 选项卡根节点
 */
const Tabs = React.createClass({

  getInitialState() {
    return {
      tabCount: 0,
      panelCount: 0,
      activeIndex: this.props.avtiveIndex || 0
    }
  },

  getChildContext() {
    return {
      tabs: this
    }
  },

  componentWillReceiveProps(nextProps) {
    'activeIndex' in this.props && this.setState({activeIndex: nextProps.activeIndex})  
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