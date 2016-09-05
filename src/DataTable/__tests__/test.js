import React from 'react'
import {
  findDOMNode
} from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import DataTable from '../index'

describe('DataTable', () => {

  describe('basic', () => {
    const data = {
      "totalList": [{
        "id": "1",
        "name": "张三",
        "age": "11",
        "isSelect": true,
        "disabled": true
      }, {
        "id": "10",
        "name": "张柏仁",
        "age": "23"
      }, {
        "id": "11",
        "name": "黄冬冬",
        "age": "25"
      }, {
        "id": "12",
        "name": "张博谦",
        "age": "45"
      }, {
        "id": "13",
        "name": "张伯苓",
        "age": "66"
      }, {
        "id": "14",
        "name": "溧阳路",
        "age": "30"
      }, {
        "id": "15",
        "name": "张雪生",
        "age": "19"
      }, {
        "id": "16",
        "name": "邵冬梅",
        "age": "41"
      }],
      "currentPage": 1,
      "totalPageNum": 32
    }
    const column = [{
      title: '姓名',
      order: true,
      width: '100px',
      key: 'name'
    }, {
      title: '年龄',
      key: 'age',
      order: true
    }]

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} className="test" />
      )
      const container = findDOMNode(instance)
      const table = container.querySelector('.bfd-datatable')
      expect(table.className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} style={{borderColor: 'red'}}/>
      )
      const container = findDOMNode(instance)
      const table = container.querySelector('.bfd-datatable')
      expect(table.style.borderColor).toBe('red')
    })

    it('width is ok', () => {
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} showPage="true" howRow={8}/>
      )
      const container = findDOMNode(instance)
      const ths = container.querySelectorAll('thead tr th')
      expect(parseInt(ths[0].style.width)).toBe(100)
    })

    it('data is ok', () => {
      const pageSize = 8
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} showPage="true" howRow={pageSize}/>
      )
      const container = findDOMNode(instance)
      const tr = container.querySelectorAll('tbody tr')
      expect(tr.length).toEqual(pageSize)
    })

    it('checkbox is select', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} onCheckboxSelect={handleClick} />
      )
      const container = findDOMNode(instance)
      const inputs = container.querySelectorAll('tbody input')
      console.log(inputs[0])
      expect(inputs[0].checked).toBe(true)
      expect(inputs[1].checked).toBe(false)
    })

    it('checkbox is disabled', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} onCheckboxSelect={handleClick} />
      )
      const container = findDOMNode(instance)
      const inputs = container.querySelectorAll('tbody input')
      expect(inputs[0].disabled).toBe(true)
      expect(inputs[1].disabled).toBe(false)
    })
  })

  describe('event test', () => {
    const renderFn = jest.fn()
    const data = {
      "totalList": [{
        "id": "1",
        "name": "张三",
        "age": "11"
      }, {
        "id": "2",
        "name": "李四",
        "age": "23"
      }],
      "currentPage": 1,
      "totalPageNum": 2
    }
    const column = [{
      title: '姓名',
      order: true,
      width: '100px',
      render: (item, component) => {
        return <a href="javascript:void(0);" onClick={renderFn}>编辑</a>
      },
      key: 'name'
    }, {
      title: '年龄',
      key: 'age',
      order: true
    }]

    it('checkbox click is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} onCheckboxSelect={handleClick} />
      )
      const container = findDOMNode(instance)
      const inputs = container.querySelectorAll('tbody input')

      TestUtils.Simulate.change(inputs[0])

      expect(inputs[0].checked).toBe(true)
      expect(handleClick).toBeCalled()
    })

    it('checkbox all click is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} onCheckboxSelect={handleClick} />
      )
      const container = findDOMNode(instance)
      const checkboxAll = container.querySelector('thead input')

      TestUtils.Simulate.change(checkboxAll)
      const inputs = container.querySelectorAll('tbody input')
      expect(checkboxAll.checked).toBe(true)

      expect(inputs[0].checked).toBe(true)
      expect(inputs[1].checked).toBe(true)
      expect(handleClick).toBeCalled()
    })

    it('row click is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} onRowClick={handleClick} />
      )
      const container = findDOMNode(instance)
      const trs = container.querySelectorAll('tbody tr')

      TestUtils.Simulate.click(trs[0])
      expect(handleClick).toBeCalled()
    })

    it('onOrder is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} onOrder={handleClick} />
      )
      const container = findDOMNode(instance)
      const ths = container.querySelectorAll('thead tr th')
      TestUtils.Simulate.click(ths[0])
        //console.log(handleClick.mock.calls)
      expect(handleClick).toBeCalled()
      expect(handleClick.mock.calls.length).toBe(1)
      expect(handleClick.mock.calls[0][0]).toEqual('name')
      expect(handleClick.mock.calls[0][1]).toEqual('asc')

      TestUtils.Simulate.click(ths[0])
      expect(handleClick.mock.calls.length).toBe(2)
      expect(handleClick.mock.calls[1][1]).toEqual('desc')
    })

    it('column render click is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <DataTable data={data} column={column} onOrder={handleClick} />
      )
      const container = findDOMNode(instance)
      const name = container.querySelectorAll('tbody tr td a')
      TestUtils.Simulate.click(name[0])
      expect(renderFn).toBeCalled()
    })
  })
})