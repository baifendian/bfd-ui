import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import ClearableInput from '../'

describe('ClearableInput', () => {

  it('clear is ok', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(<ClearableInput value="test" onChange={handleChange} />)
    const clearNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'clear')
    TestUtils.Simulate.click(clearNode)
    expect(handleChange).toBeCalledWith('')
    expect(TestUtils.findRenderedDOMComponentWithTag(instance, 'input').value).toBe('')
  })
})