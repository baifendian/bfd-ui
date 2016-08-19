import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Calendar from '../Calendar'

describe('Calendar', () => {

  it('date is ok', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" />)
    const resultNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'result')
    expect(resultNode.textContent).toBe('2016年 1月')
    expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'active').textContent).toBe('1')
  })

  it('toggle is ok', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" />)
    const leftNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'pull-left')
    const rightNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'pull-right')
    const resultNode = TestUtils.findRenderedDOMComponentWithClass(instance, 'result')
    
    TestUtils.Simulate.click(leftNode.children[0])
    expect(resultNode.textContent).toBe('2015年 1月')
    TestUtils.Simulate.click(leftNode.children[1])
    expect(resultNode.textContent).toBe('2014年 12月')

    TestUtils.Simulate.click(rightNode.children[0])
    expect(resultNode.textContent).toBe('2015年 1月')
    TestUtils.Simulate.click(rightNode.children[1])
    expect(resultNode.textContent).toBe('2016年 1月')
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