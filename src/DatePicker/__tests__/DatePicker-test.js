import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import DatePicker from '../DatePicker'

describe('DatePicker', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(<DatePicker className="test" />)
      expect(ReactDOM.findDOMNode(instance).className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(<DatePicker style={{color: 'red'}} />)
      expect(ReactDOM.findDOMNode(instance).style.color).toBe('red')
    })

    it('onClick is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(<DatePicker onClick={handleClick} />)
      TestUtils.Simulate.click(ReactDOM.findDOMNode(instance))
      expect(handleClick).toBeCalled()
    })
  })

  it('custom date is ok', () => {
    const instance = TestUtils.renderIntoDocument(<DatePicker date="2016-01-01" onSelect={jest.fn()} />)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0].value).toBe(new Date('2016-01-01').toLocaleDateString())
  })

  it('onSelect is ok', () => {
    const handleSelect = jest.fn()
    const instance = TestUtils.renderIntoDocument(<DatePicker date="2016-01-01" onSelect={handleSelect} />)
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
    TestUtils.Simulate.click(buttons[0])
    expect(handleSelect).toBeCalled()
  })
})