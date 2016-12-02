import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import DateRange from '../DateRange'

describe('DateRange', () => {
  it('should onSelect works', () => {
    document.body.innerHTML = ''
    const handleSelect = jest.fn()
    const instance = TestUtils.renderIntoDocument(<DateRange start="2016-01-01" onSelect={handleSelect} />)
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('.bfd-dropdown__toggle'))
    TestUtils.Simulate.click(document.querySelector('tbody button'))
    expect(handleSelect).toBeCalled()
  })
})
