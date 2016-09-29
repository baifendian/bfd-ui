import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import TreeSelect from '../index'

describe('TreeSelect', () => {

  it('should value works', () => {
    const data = [{
      name: '0',
      value: '0'
    }]
    const instance = TestUtils.renderIntoDocument(
      <TreeSelect value="0" defaultData={data} onChange={jest.fn()} />
    )
    const selected = findDOMNode(instance).querySelector('.bfd-tree__node-content--active')
    expect(selected.textContent).toBe('0')
  })
})