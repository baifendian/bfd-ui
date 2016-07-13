import React, { Component } from 'react'
import TableTree from 'c/TableTree'
import Panel from '../Panel'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const codeBasic = `import TableTree from 'bfd-ui/lib/TableTree'

class Basic extends Component {

  constructor(props) {
    super(props)
    this.columns = [{
      title: '资源名称',
      key: 'name'
    }, {
      title: '授权状态',
      render: item => item.status === 1 ? '已授权' : '未授权'
    }, {
      title: '授权用户',
      render: item => <a href="">查看用户</a>
    }]
  }

  render() {
    return <TableTree url="/data/tableTree.json" columns={this.columns} />
  }
}`

class Basic extends Component {

  constructor(props) {
    super(props)
    this.columns = [{
      title: '资源名称',
      key: 'name'
    }, {
      title: '授权状态',
      render: item => item.status === 1 ? '已授权' : '未授权'
    }, {
      title: '授权用户',
      render: item => <a href="">查看用户</a>
    }]
  }

  render() {
    return <TableTree url="/data/tableTree.json" columns={this.columns} />
  }
}

export default () => {
  return (
    <div>
      <h1></h1>
      <h2>TableTree</h2>
      <Panel title="基础展示" code={codeBasic}>
        <Basic />
      </Panel>
      <Props>
        <Prop name="columns" type="array" required>
          <p>列配置，第一列为 tree 列</p>
          <Pre>{
`{
  title: '列标题显示内容',
  key: '对应的数据键，默认表格单元格渲染 item.key',
  render: '作为 key 的替代，自定义渲染单元格，回调参数为当前数据对象'
}`}</Pre>
        </Prop>
        <Prop name="data" type="array">
          <p>数据源</p>
          <Pre>{
`{
  // 数据字段自定义
  ...
  // 配置字段说明
  open: '是否展开',
  children: '字节点'
}`}</Pre>
        </Prop>
        <Prop name="defaultData" type="array">
          <p>数据源</p>
        </Prop>
        <Prop name="onChange" type="func">
          <p>数据改变后的回调</p>
        </Prop>
        <Prop name="url" type="string">
          <p>AJAX 数据源 URL，接收的格式同 data</p>
        </Prop>
      </Props>
    </div>
  )
}