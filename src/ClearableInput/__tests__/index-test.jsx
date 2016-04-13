import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import ClearableInput from '../'

describe('ClearableInput', () => {

  it('className is ok', () => {
    const clearableInput = TestUtils.renderIntoDocument(<ClearableInput className="test" />)
    expect(ReactDOM.findDOMNode(clearableInput).className.split(' ')).toContain('test')
  })

  it('value is ok', () => {
    const clearableInput = TestUtils.renderIntoDocument(<ClearableInput value="test" />)
    expect(TestUtils.findRenderedDOMComponentWithTag(clearableInput, 'input').value).toBe('test')
  })

  it('size is ok', () => {
    const clearableInput = TestUtils.renderIntoDocument(<ClearableInput size="sm" />)
    expect(TestUtils.findRenderedDOMComponentWithTag(clearableInput, 'input').className.split(' ')).toContain('input-sm')
  })

  it('placeholder is ok', () => {
    const clearableInput = TestUtils.renderIntoDocument(<ClearableInput placeholder="test" />)
    expect(TestUtils.findRenderedDOMComponentWithTag(clearableInput, 'input').getAttribute('placeholder')).toBe('test')
  })

  it('onChange is ok', () => {
    let value
    const clearableInput = TestUtils.renderIntoDocument(<ClearableInput onChange={v => {value = v}} />)
    const inputNode = TestUtils.findRenderedDOMComponentWithTag(clearableInput, 'input')
    TestUtils.Simulate.change(inputNode, {target: {value: 'changed'}})
    expect(value).toBe('changed')
  })

  it('clear is ok', () => {
    let value
    const clearableInput = TestUtils.renderIntoDocument(<ClearableInput value="test" onChange={v => {value = v}} />)
    const clearNode = TestUtils.findRenderedDOMComponentWithClass(clearableInput, 'clear')
    TestUtils.Simulate.click(clearNode)
    expect(value).toBe('')
  })
})