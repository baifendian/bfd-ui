import React, { Component, PropTypes } from 'react'
import update from 'react-addons-update'
import classnames from 'classnames'
import TreeNode from './TreeNode'
import './less/tree.less'

class Tree extends Component {

  constructor(props) {
    super(props)
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

  handleNodeChange(key, value, path) {
    const data = this.update(this.state.data, key, value, path)
    this.handleChange(data)
  }

  update(source, key, value, path) {
    const target = {}
    let temp = target
    path.forEach(key => {
      temp[key] = {}
      temp = temp[key]
    })
    temp[key] = {
      $set: value
    }
    return update(source, target)
  }

  handleChange(data) {
    this.setState({ data })
    this.props.onChange && this.props.onChange(data)
  }

  handleNodeActive(path) {
    if (!this.props.onActive) return
    let data = this.state.data
    if (this.activePath) {
      data = this.update(data, 'active', false, this.activePath)
    }
    data = this.update(data, 'active', true, path)
    this.handleChange(data)
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
  getUrl: PropTypes.func
}

export default Tree