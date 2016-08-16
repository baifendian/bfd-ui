import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import DatePicker from '../DatePicker'

describe('DatePicker', () => {

  it('should date works', () => {
    const instance = TestUtils.renderIntoDocument(<DatePicker date="2016-01-01" onSelect={jest.fn()} />)
    expect(findDOMNode(instance).querySelector('input').value).toBe('2016-01-01')
  })

  it('should onSelect works', () => {
    const handleSelect = jest.fn()
    const instance = TestUtils.renderIntoDocument(<DatePicker date="2016-01-01" onSelect={handleSelect} />)
    TestUtils.Simulate.click(findDOMNode(instance).querySelector('tbody button'))
    expect(handleSelect).toBeCalled()
  })
})