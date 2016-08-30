import '../table.less'
import React, { Component, PropTypes } from 'react'
import update from 'react-update'
import classnames from 'classnames'
import shouldComponentUpdate from '../shouldComponentUpdate'
import Fetch from '../Fetch'
import Row from './Row'

class TableTree extends Component {

  constructor(props) {
    super(props)
    this.update = update.bind(this)
    this.state = {
      data: props.defaultData || props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.data && this.setState({data: nextProps.data})  
  }

  shouldComponentUpdate: shouldComponentUpdate

  handleRowChange(type, path, value) {
    const nextData = this.update(type, ['data', ...path], value)
    this.props.onChange && this.props.onChange(nextData)
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
          onChange={::this.handleRowChange}
        />
      )
      this.rows.push(row)
      this.loopLeaf(item.children, [..._path, 'children'], hidden || !item.open)
    })
  }

  render() {
    const { className, columns, url, data, ...other} = this.props

    delete other.defaultData
    delete other.onChange

    this.rows = []
    this.loopLeaf(data, [])
    return (
      <Fetch 
        className={classnames('bfd-table-tree', className)}
        url={url} 
        onSuccess={data => this.setState({ data })}
        {...other}
      >
        <table className="bfd-table">
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

  // 字段配置
  columns: PropTypes.array.isRequired,

  // 数据源
  data: PropTypes.array,

  // 初始化数据源（不可控）
  defaultData: PropTypes.array,

  // 数据改变后的回调，参数为改变后的数据
  onChange: PropTypes.func,

  // URL 数据源
  url: PropTypes.string
}

export default TableTree