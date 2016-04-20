import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import ClearableInput from '../'

describe('ClearableInput', () => {

  it('className is ok', () => {
    const instance = TestUtils.renderIntoDocument(<ClearableInput className="test" />)
    expect(ReactDOM.findDOMNode(instance).className.split(' ')).toContain('test')
  })

  it('style is ok', () => {
    const instance = TestUtils.renderIntoDocument(<ClearableInput style={{color: 'red'}} />)
    expect(ReactDOM.findDOMNode(instance).style.color).toBe('red')
  })

  it('onClick is ok', () => {
    const handleClick = jest.fn()
    const instance = TestUtils.renderIntoDocument(<ClearableInput onClick={handleClick} />)
    TestUtils.Simulate.click(ReactDOM.findDOMNode(instance))
    expect(handleClick).toBeCalled()
  })

  it('value is ok', () => {
    const instance = TestUtils.renderIntoDocument(<ClearableInput value="test" onChange={() => {}} />)
    expect(TestUtils.findRenderedDOMComponentWithTag(instance, 'input').value).toBe('test')
  })

  it('size is ok', () => {
    const instance = TestUtils.renderIntoDocument(<ClearableInput size="sm" />)
    expect(TestUtils.findRenderedDOMComponentWithTag(instance, 'input').className.split(' ')).toContain('input-sm')
  })

  it('placeholder is ok', () => {
    const instance = TestUtils.renderIntoDocument(<ClearableInput placeholder="test" />)
    expect(TestUtils.findRenderedDOMComponentWithTag(instance, 'input').getAttribute('placeholder')).toBe('test')
  })

  it('inline is ok', () => {
    const instance = TestUtils.renderIntoDocument(<ClearableInput inline />)
    expect(ReactDOM.findDOMNode(instance).className.split(' ')).toContain('inline')
  })

  it('onChange is ok', () => {
    let value
    const instance = TestUtils.renderIntoDocument(<ClearableInput onChange={v => {value = v}} />)
    const inputNode = TestUtils.findRenderedDOMComponentWithTag(instance, 'input')
    TestUtils.Simulate.change(inputNode, {target: {value: 'changed'}})
    expect(value).toBe('changed')
  })

  it('clear is ok', () => {
    let value
    const instance = TestUtils.renderIntoDocument(<ClearableInput value="test" onChange={v => {value = v}} />)
    const clearNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'clear')
    TestUtils.Simulate.click(clearNode)
    expect(value).toBe('')
  })
})