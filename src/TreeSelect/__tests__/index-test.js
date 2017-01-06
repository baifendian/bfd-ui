import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import TreeSelect from '../index'

describe('TreeSelect', () => {

  it('should value works', () => {
    document.body.innerHTML = ''
    const data = [{
      name: '0',
      value: '0'
    }]
    const instance = TestUtils.renderIntoDocument(
      <TreeSelect value="0" defaultData={data} onChange={jest.fn()} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container)
    expect(document.querySelector('.bfd-tree__node-content--active').textContent).toBe('0')
  })
})
