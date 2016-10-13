import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import TableTree from '../index'

describe('TableTree', () => {

  const columns = [{
    title: '资源名称',
    key: 'name'
  }, {
    title: '授权状态',
    render: item => item.status === 1 ? '已授权' : '未授权'
  }, {
    title: '授权用户',
    render: item => <a href="">查看用户</a>
  }]

  const data = [{
    "name": "配置中心",
    "status": 0,
    "open": true,
    "children": [{
      "name": "资源管理",
      "status": 1,
      "children": [{
        "name": "mysql_1",
        "status": 1
      }, {
        "name": "kafka_1",
        "status": 0
      }]
    }, {
      "name": "消息中心",
      "status": 0
    }]
  }, {
    "name": "数据工厂",
    "status": 1
  }, {
    "name": "服务中心",
    "status": 0
  }]

  it('should toggle works', () => {
    const instance = TestUtils.renderIntoDocument(
      <TableTree defaultData={data} columns={columns} />
    )
    const container = findDOMNode(instance)
    console.log(container.querySelectorAll('.bfd-table-tree__node-toggle').length)
    TestUtils.Simulate.click(container.querySelectorAll('.bfd-table-tree__node-toggle')[1])
    expect(container.querySelectorAll('.bfd-table-tree__row')[2].className).not.toContain('hidden')
    
    TestUtils.Simulate.click(container.querySelectorAll('.bfd-table-tree__node-toggle')[0])
    expect(container.querySelectorAll('.bfd-table-tree__row')[4].className).toContain('hidden')
    
    TestUtils.Simulate.click(container.querySelectorAll('.bfd-table-tree__node-toggle')[0])
    expect(container.querySelectorAll('.bfd-table-tree__row')[2].className).not.toContain('hidden')
  })

  it('should col render works', () => {
    const instance = TestUtils.renderIntoDocument(
      <TableTree defaultData={data} columns={columns} />
    )
    const container = findDOMNode(instance)
    expect(container.querySelectorAll('tbody td')[1].textContent).toBe('未授权')
  })

  it('should onChange works', () => {
    let isOpen = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <TableTree 
        columns={columns}
        defaultData={data} 
        onChange={data => {
          isOpen(data[0].open)
        }}
      />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('.bfd-table-tree__node-toggle'))
    expect(isOpen).toBeCalledWith(false)
  })
})