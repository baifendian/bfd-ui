import React, { PropTypes } from 'react'
import update from 'react-addons-update'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import classnames from 'classnames'
import Icon from '../Icon'
import Fetch from '../Fetch'
import warning from 'warning'

const TreeNode = React.createClass({

  getInitialState() {
    return this.props.data
  },

  componentWillReceiveProps(nextProps) {
    'data' in nextProps && this.setState(nextProps.data)
  },

  shouldComponentUpdate,

  componentDidMount() {
    this.state.active && this.active()  
  },

  handleToggle() {
    this.set('open', !this.state.open)
    this.props.onChange()
  },

  set(key, value, callback) {
    this.updateParentValue(key, value)
    this.setState({[key]: value}, callback)
  },

  updateParentValue(key, value) {
    const { parentData, index } = this.props
    parentData[index] = update(parentData[index], {
      [key]: {$set: value}
    })
  },

  handleLoad(data) {
    this.set('children', data)
  },

  active() {
    this.props.onActive && this.props.onActive(this)
  },

  render() {
    const { beforeNodeRender, render, getIcon, getUrl } = this.props
    const { ...treeNode } = { beforeNodeRender, render, getIcon, getUrl }
    const { name, open, isParent, active, children } = this.state

    const hasChildren = children && children.length
    
    let Children
    if (hasChildren) {
      Children = (
        <ul>
        {children.map((item, i) => {
          return (
            <TreeNode 
              key={i}
              parent={this} 
              parentData={children} 
              index={i} 
              data={item} 
              onChange={this.props.onChange}
              onActive={this.props.onActive} 
              {...treeNode}
            />
          )
        })}
        </ul>
      )
    } else {
      if (isParent && getUrl && open) {
        Children = <Fetch url={getUrl(this.state)} onSuccess={this.handleLoad} />
      }
    }

    let icon
    if (getIcon) {
      icon = getIcon(this.state)
    } else {
      if (hasChildren || isParent) {
        icon = 'folder' + (open ? '-open' : '')
      } else {
        icon = 'file'
      }
    }

    return (
      <li className={classnames({ open })}>
        <Icon 
          className="toggle"
          style={{visibility: hasChildren || isParent ? 'visible' : 'hidden'}} 
          type={open ? 'minus-square' : 'plus-square'} 
          onClick={this.handleToggle} 
        />
        <div 
          className={classnames('node', { active })} 
          onClick={this.active}
        >
          {beforeNodeRender ? beforeNodeRender(this) : null}
          <Icon type={icon} className="toggle-icon" />
          {render ? render(this.state) : name}
        </div>
        {Children}
      </li>
    )
  }
})

TreeNode.propTypes = {
  onChange: PropTypes.func.isRequired,
  parentData: PropTypes.array,
  render: PropTypes.func,
  index: PropTypes.number,
  data: PropTypes.object
}

export default TreeNode