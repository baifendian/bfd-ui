import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Calendar from '../Calendar'

describe('Calendar', () => {

  it('date is ok', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" />)
    const resultNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'result')
    expect(resultNode.children[0].textContent).toBe('2016')
    expect(resultNode.children[2].textContent).toBe('1')
    expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'active').textContent).toBe('1')
  })

  it('toggle is ok', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" />)
    const leftNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'pull-left')
    const rightNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'pull-right')
    const resultNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'result')
    
    TestUtils.Simulate.click(leftNode.children[0])
    expect(resultNode.children[0].textContent).toBe('2015')
    TestUtils.Simulate.click(leftNode.children[1])
    expect(resultNode.children[2].textContent).toBe('12')

    TestUtils.Simulate.click(rightNode.children[0])
    expect(resultNode.children[2].textContent).toBe('1')
    TestUtils.Simulate.click(rightNode.children[1])
    expect(resultNode.children[0].textContent).toBe('2016')
  })

  it('today is ok', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar />)
    expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'today').textContent).toBe(String(new Date().getDate()))
  })

  it('onSelect is ok', () => {
    const handleSelect = jest.fn()
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" onSelect={handleSelect} />)
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
    TestUtils.Simulate.click(buttons[0])
    expect(handleSelect).toBeCalled()
  })
})