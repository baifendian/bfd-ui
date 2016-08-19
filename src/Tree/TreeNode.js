import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Icon from '../Icon'
import Fetch from '../Fetch'
import warning from 'warning'

class TreeNode extends Component {

  componentWillMount() {
    if (this.props.data.active) {
      this.context.tree.activePath = this.props.path 
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data
  }
  
  handleToggle(e) {
    e.stopPropagation()
    this.handleChange('open', !this.props.data.open)
  }

  handleNodeClick() {
    this.context.tree.handleNodeActive(this.props.path)
  }

  handleChange(key, value) {
    this.context.tree.handleNodeChange(key, value, this.props.path)
  }

  handleLoad(data) {
    this.isloaded = true
    const filter = this.context.tree.props.dataFilter
    if (filter) {
      data = filter(data)
    }
    this.handleChange('children', data)
  }

  render() {
    const { beforeNodeRender, getIcon, getUrl } = this.context.tree.props
    const { data, path } = this.props
    const { name, open, isParent, active, children } = data
    const tree = this.context.tree
    const hasChildren = children && children.length
    const indent = {
      paddingLeft: Math.floor(path.length / 2) * 20 + 'px'
    }
    
    let Children
    if (hasChildren) {
      Children = (
        <ul>
        {children.map((item, i) => {
          return (
            <TreeNode 
              key={i}
              data={item} 
              path={this.props.path.concat('children', i)}
            />
          )
        })}
        </ul>
      )
    } else {
      if (isParent && getUrl && open && !this.isloaded) {
        Children = (
          <Fetch 
            style={indent} 
            url={getUrl(data, tree.getPathData(path))} 
            onSuccess={this.handleLoad.bind(this)} 
          />
        )
      } else {
        Children = null
      }
    }

    let typeIcon = getIcon ? getIcon(data) : ''

    return (
      <li className={classnames({ open })}>
        <div 
          style={indent}
          className={classnames('node-content', { active })}
          onClick={this.handleNodeClick.bind(this)}
        >
          <div className="node-assist">
            <Icon 
              className="icon-toggle"
              style={{visibility: hasChildren || isParent ? 'visible' : 'hidden'}} 
              type="caret-right"
              onClick={this.handleToggle.bind(this)} 
            />
            {beforeNodeRender ? beforeNodeRender(data, path) : null}
            {typeIcon ? <Icon type={typeIcon} className="icon-type" /> : null}
          </div>
          {tree.props.render ? tree.props.render(data, path) : <div>{name}</div>}
        </div>
        {Children}
      </li>
    )
  }
}

TreeNode.contextTypes = {
  tree: PropTypes.object
}

export default TreeNode