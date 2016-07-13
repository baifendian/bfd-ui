import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import ClearableInput from '../index'

describe('ClearableInput', () => {


  it('should onChange works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <ClearableInput value="test" onChange={handleChange} />
    )
    const container = findDOMNode(instance)
    
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: 'changed'  
      }
    })
    expect(handleChange).toBeCalledWith('changed')
    
    TestUtils.Simulate.click(container.querySelector('.clear'))
    expect(handleChange).toBeCalledWith('')
  })


  it('should clear works', () => {
    const instance = TestUtils.renderIntoDocument(<ClearableInput defaultValue="test" />)
    const container = findDOMNode(instance)
    
    TestUtils.Simulate.click(container.querySelector('.clear'))
    expect(container.querySelector('input').value).toBe('')
  })


  it('should onClear works', () => {
    const handleClear = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <ClearableInput defaultValue="test" onClear={handleClear} />
    )
    const container = findDOMNode(instance)
    
    TestUtils.Simulate.click(container.querySelector('.clear'))
    expect(handleClear).toBeCalled()
  })
})