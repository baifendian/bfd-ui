import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const TableTree = React.createClass({

  getInitialState() {
    return {
      data: this.props.data || []
    }
  },

  componentWillReceiveProps(nextProps) {
    nextProps.data && this.setState({data: nextProps.data})  
  },

  render() {
    const { className, columns, ...other} = this.props
    return (
      <table className={classnames('bfd-table-tree', className)} {...other}>
        <thead>
          <tr>
            {columns.map(item, i => <td key={i}>{item.title}</td>)}
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    )
  }
})

TableTree.propTypes = {
  columns: PropTypes.array.required,
  data: PropTypes.array,
  url: PropTypes.string,
  customProp({ url, data }) {
    if (!url && !data) {
      return new Error('No `url` or `data` property.')
    }
    if (url && data) {
      return new Error('`url` and `data` can\'t exist at the same time.')
    }
  }
}

export default TableTree