import React from 'react'
import classnames from 'classnames'

const TreeNode = React.createClass({

  getInitialState() {
    return {
      isOpen: true
    }
  },

  handleToggle() {
    this.setState({isOpen: !this.state.isOpen})
  },

  render() {
    const data = this.props.data
    return (
      <li className={classnames({open: this.state.isOpen})}>
        {data.children ? (
          <button type="button" className="btn btn-primary toggle" onClick={this.handleToggle}>
            <span className={'glyphicon glyphicon-' + (this.state.isOpen ? 'minus' : 'plus')}></span>
          </button>
        ) : null}
        <span className="glyphicon glyphicon-file"></span>
        {data.name}
        {data.children ? (
          <ul>{data.children.map((item, i) => <TreeNode key={i} data={item}></TreeNode>)}</ul>
        ) : null}
      </li>
    )
  }
})

export default TreeNode