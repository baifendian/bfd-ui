import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Fetch from '../Fetch'
import Row from './Row'
import 'bfd-bootstrap'

class TableTree extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: props.defaultData || props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.data && this.setState({data: nextProps.data})  
  }

  handleChange() {
    const data = this.state.data
    this.setState({ data })
    this.props.onChange && this.props.onChange(data)
  }

  loopLeaf(data, path, hidden) {
    if (!data) return
    data.forEach((item, i) => {
      const _path = [...path, i]
      const row = (
        <Row
          key={_path.join('')}
          data={item}
          hidden={hidden}
          path={_path} 
          columns={this.props.columns} 
          onChange={this.handleChange.bind(this)}
        />
      )
      this.rows.push(row)
      this.loopLeaf(item.children, _path, hidden || !item.open)
    })
  }

  handleLoad(data) {
    this.setState({ data })
  }

  render() {
    const { className, columns, url, data, ...other} = this.props
    this.rows = []
    this.loopLeaf(this.state.data, [])
    return (
      <Fetch 
        className={classnames('bfd-table-tree', className)}
        url={url} 
        onSuccess={this.handleLoad.bind(this)}
        {...other}
      >
        <table className="table">
          <thead>
            <tr>
              {columns.map((item, i) => <th key={i}>{item.title}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.rows}
          </tbody>
        </table>
      </Fetch>
    )
  }
}

TableTree.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  defaultData: PropTypes.array,
  onChange: PropTypes.func,
  url: PropTypes.string
}

export default TableTree