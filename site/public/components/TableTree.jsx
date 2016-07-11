import React from 'react'
import TableTree from 'c/TableTree'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const Baise = React.createClass({

  getInitialState() {
    this.data = [{
      name: '配置中心',
      status: 0,
      children: [{
        name: '资源管理',
        status: 1
      }, {
        name: '消息中心',
        status: 0
      }]
    }, {
      name: '数据工厂',
      status: 1
    }, {
      name: '服务中心',
      status: 0
    }]
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
  },

  render() {
    return <TableTree data={this.data} columns={this.columns} />
  }
})

export default () => {
  return (
    <div>
      <h1></h1>
      <h2>TableTree</h2>
      <Props>
        <Prop name="test" type="string">
          <p>test</p>
        </Prop>
      </Props>
    </div>
  )
}