import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import SelectTree from '../SelectTree'

describe('SelectTree', () => {

  it('should onSelect works', () => {
    const data = [{
      name: 'a'
    }]
    const handleSelect = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <SelectTree defaultData={data} onSelect={handleSelect} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.change(container.querySelector('.bfd-checkbox input'), {
      target: {
        checked: true
      }
    })
    expect(handleSelect).toBeCalledWith([{
      name: 'a',
      checked: true
    }], {
      name: 'a'
    }, [0], true)
  })
})