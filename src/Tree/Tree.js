import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import update from 'react-update'
import shouldComponentUpdate from '../shouldComponentUpdate'
import TreeNode from './TreeNode'
import './less/tree.less'

class Tree extends Component {

  constructor(props) {
    super(props)
    this.update = update.bind(this)
    this.state = {
      data: props.defaultData || props.data  
    }
  }

  getChildContext() {
    return {
      tree: this
    }
  }

  componentWillReceiveProps(nextProps) {
    'data' in nextProps && this.setState({data: nextProps.data})
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldComponentUpdate.call(this, ['data'], nextProps, nextState)
  }

  updateData(...args) {
    const data = this.update(...args)
    this.props.onChange && this.props.onChange(data)
    return data
  }

  handleNodeChange(key, value, path) {
    this.updateData('set', ['data', ...path, key], value)
  }

  handleNodeActive(path) {
    if (!this.props.onActive) return
    const updates = []
    if (this.activePath) {
      updates.push(['set', ['data', ...this.activePath, 'active'], false])
    }
    updates.push(['set', ['data', ...path, 'active'], true])
    const data = this.updateData(...updates)
    this.props.onActive && this.props.onActive(this.getPathData(path, data))
    this.activePath = path
  }

  getPathData(path, data) {
    data = data || this.state.data
    const pathData = []
    path.forEach(key => {
      data = data[key]
      if (key !== 'children') {
        pathData.push(data)
      }
    })
    return pathData
  }

  render() {
    const { className, onActive, ...other } = this.props
    const data = this.state.data || []
    return (
      <div 
        className={classnames('bfd-tree', className, {activeable: onActive})} 
        {...other}
      >
        <ul>
          {data.map((item, i) => {
            return <TreeNode key={i} data={item} path={[i]} />
          })}
        </ul>
      </div>
    )
  }
}

Tree.childContextTypes = {
  tree: PropTypes.instanceOf(Tree)
}

Tree.propTypes = {
  data: PropTypes.array,
  defaultData: PropTypes.array,
  onChange: PropTypes.func,
  onActive: PropTypes.func,
  render: PropTypes.func,
  getIcon: PropTypes.func,
  getUrl: PropTypes.func,
  dataFilter: PropTypes.func
}

export default Tree