import React, { PropTypes } from 'react'
import TreeNode from './TreeNode'
import classnames from 'classnames'
import './less/tree.less'

const Tree = React.createClass({

  getInitialState() {
    return {
      data: this.props.data || this.props.defaultData
    }
  },

  componentWillReceiveProps(nextProps) {
    'data' in nextProps && this.setState({
      data: nextProps.data
    })
  },

  handleNodeChange() {
    this.props.onChange && this.props.onChange(this.state.data)
  },

  render() {
    const { className, beforeNodeRender, ...other } = this.props
    const data = this.state.data
    return (
      <div className={classnames('bfd-tree', className)} {...other}>
        <ul>
          {data.map((item, i) => {
            return <TreeNode key={i} parentData={data} index={i} data={item} onChange={this.handleNodeChange} beforeNodeRender={beforeNodeRender} />
          })}
        </ul>
      </div>
    )
  }
})

Tree.propTypes = {
  data: PropTypes.array,
  defaultData: PropTypes.array,
  onChange: PropTypes.func,
  customProp({ data, defaultData, onChange }) {
    if (data && !onChange) {
      return new Error('You provided a `data` prop without an `onChange` handler')
    }
    if (!data && !defaultData) {
      return new Error('You should provided a `data` prop or a `defaultData` prop at least')
    }
  }
}

export default Tree