import React, { PropTypes } from 'react'
import classnames from 'classnames'

const propTypes = {
  location: PropTypes.array.isRequired,
  open: PropTypes.bool,
  item: PropTypes.object,
  parent: PropTypes.array,
  nodeRender: PropTypes.func
}

const defaultProps = {
  nodeRender(props) {
    return props.item.name
  }
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
    let icon
    if (item.children) {
      icon = 'folder-' + (this.state.isOpen ? 'open' : 'close')
    } else {
      icon = 'file'
    }
    return (
      <li className={classnames({open: this.state.isOpen})}>
        {item.children ? (
          <button type="button" className="btn btn-primary toggle" onClick={this.handleToggle}></button>
        ) : null}
        <span className={'glyphicon glyphicon-' + icon}></span>
        {this.props.nodeRender(this.props)}
        {this.props.children}
      </li>
    )
  }
})

TreeNode.propTypes = propTypes
TreeNode.defaultProps = defaultProps

export default TreeNode