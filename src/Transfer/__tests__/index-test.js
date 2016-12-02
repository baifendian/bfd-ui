import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Transfer from '../'

describe('Transfer', () => {
  const sourceData = [
    {id: 1, label: '张三'},
    {id: 2, label: '李四'},
    {id: 3, label: '李五'},
    {id: 4, label: '李六'},
    {id: 5, label: '李七五'},
    {id: 6, label: '李八'},
    {id: 7, label: '李九四'},
    {id: 8, label: '李十'},
    {id: 9, label: '李时珍'}
  ]
  const targetData = [
    {id: 10, label: '张三疯'},
    {id: 11, label: '王二小'}
  ]

  function handleChange(sourceData, targetData) {
    sourceData = sourceData
    targetData = targetData
  }

  const instance = TestUtils.renderIntoDocument(<Transfer height={200}
          title="已选的用户"
          sdata={sourceData}
          tdata={targetData}
          onChange={handleChange} />)

  it('className is ok', () => {
    expect(ReactDOM.findDOMNode(instance).className.split(' ')).toContain('bfd-transfer')
  })

  it('title is ok', () => {
    expect(ReactDOM.findDOMNode(instance).children[2].children[0].children[0].innerHTML).toEqual('已选的用户')
  })

  it('onClick style is ok', () => {
    const instance = TestUtils.renderIntoDocument(<Transfer height={200}
          title="已选的用户"
          sdata={sourceData}
          tdata={targetData}
          />)
    const snode = ReactDOM.findDOMNode(instance).children[0].children[1].children[0].getElementsByTagName('a')[0]
    TestUtils.Simulate.click(snode)
    expect(snode.className.split(' ')).toContain('selected')

    const tnode = ReactDOM.findDOMNode(instance).children[2].children[1].children[0].getElementsByTagName('a')[0]
    TestUtils.Simulate.click(tnode)
    expect(tnode.className.split(' ')).toContain('selected')
  })

  it('onDoubleClick is ok', () => {
    const node = ReactDOM.findDOMNode(instance).children[0].children[1].children[0].getElementsByTagName('a')[0]
    TestUtils.Simulate.doubleClick(node)
    const slen = sourceData.length
    const tlen = targetData.length
    expect(slen).toBe(8)
    expect(tlen).toBe(3)
  })
})
