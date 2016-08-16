import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import DateRange from '../DateRange'

describe('DateRange', () => {
  it('should onSelect works', () => {
    const handleSelect = jest.fn()
    const instance = TestUtils.renderIntoDocument(<DateRange start="2016-01-01" onSelect={handleSelect} />)
    TestUtils.Simulate.click(findDOMNode(instance).querySelector('tbody button'))
    expect(handleSelect).toBeCalled()
  })
})