import React, { PropTypes } from 'react'
import classnames from 'classnames'

const propTypes = {
  location: PropTypes.array.isRequired,
  open: PropTypes.bool,
  item: PropTypes.object,
  parent: PropTypes.array,
  beforeNode: PropTypes.func
}

const TreeNode = React.createClass({

  getInitialState() {
    return {
      isOpen: !!this.props.open
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.item === nextProps.item && this.state.isOpen === nextState.isOpen)
  },

  handleToggle() {
    this.setState({isOpen: !this.state.isOpen})
  },

  render() {
    const item = this.props.item

    if (!item.name) {
      throw 'Tree 数据节点 name 字段不能为空'
    }

    const hasChildren = item.children && item.children.length
    let icon
    if (hasChildren) {
      icon = 'folder-' + (this.state.isOpen ? 'open' : 'close')
    } else {
      icon = 'file'
    }
    return (
      <li className={classnames({open: this.state.isOpen})}>
        <button style={{visibility: hasChildren ? 'visible' : 'hidden'}}  type="button" className="btn btn-primary toggle" onClick={this.handleToggle}>
          <span className={'glyphicon glyphicon-' + (this.state.isOpen ? 'minus' : 'plus')}></span>
        </button>
        {this.props.beforeNode ? this.props.beforeNode(this.props) : null}
        <span className={'toggle-icon glyphicon glyphicon-' + icon}></span>
        <div className="node-content">{item.name}</div>
        {this.props.children}
      </li>
    )
  }
})

TreeNode.propTypes = propTypes

export default TreeNode