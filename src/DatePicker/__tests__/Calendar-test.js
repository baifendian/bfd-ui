import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Calendar from '../Calendar'

describe('Calendar', () => {

  it('should date works', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" />)
    const container = findDOMNode(instance)
    expect(container.querySelector('.bfd-calendar__result').children[0].textContent).toBe('2016')
    expect(container.querySelector('.bfd-calendar__result').children[2].textContent).toBe('1')
    expect(container.querySelector('.bfd-calendar__day--active').textContent).toBe('1')
  })

  it('should toggle works', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" />)
    const container = findDOMNode(instance)

    const header = container.querySelector('.bfd-calendar__header')

    const buttons = header.querySelectorAll('button')
    const result = header.querySelector('.bfd-calendar__result')
    
    TestUtils.Simulate.click(buttons[0])
    expect(result.children[0].textContent).toBe('2015')
    TestUtils.Simulate.click(buttons[1])
    expect(result.children[2].textContent).toBe('12')

    TestUtils.Simulate.click(buttons[2])
    expect(result.children[2].textContent).toBe('1')
    TestUtils.Simulate.click(buttons[3])
    expect(result.children[0].textContent).toBe('2016')
  })

  it('should today works', () => {
    const instance = TestUtils.renderIntoDocument(<Calendar />)
    expect(findDOMNode(instance).querySelector('.bfd-calendar__day--today').textContent).toBe(String(new Date().getDate()))
  })

  it('should onSelect works', () => {
    const handleSelect = jest.fn()
    const instance = TestUtils.renderIntoDocument(<Calendar date="2016-01-01" onSelect={handleSelect} />)
    TestUtils.Simulate.click(findDOMNode(instance).querySelector('tbody button'))
    expect(handleSelect).toBeCalled()
  })
})