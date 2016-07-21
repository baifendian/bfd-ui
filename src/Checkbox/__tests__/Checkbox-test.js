import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Checkbox from '../Checkbox'

describe('Checkbox', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(<div><Checkbox className="test" /></div>)
      expect(findDOMNode(instance).children[0].className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(<div><Checkbox style={{color: 'red'}} /></div>)
      expect(findDOMNode(instance).children[0].style.color).toBe('red')
    })

    it('onClick is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(<div><Checkbox onClick={handleClick} /></div>)
      TestUtils.Simulate.click(findDOMNode(instance).children[0])
      expect(handleClick).toBeCalled()
    })
  })

  it('value is ok', () => {
    const instance = TestUtils.renderIntoDocument(<div><Checkbox value="test" /></div>)
    expect(findDOMNode(instance).querySelector('input').value).toBe('test')
  })

  it('checked is ok', () => {
    const instance = TestUtils.renderIntoDocument(<div><Checkbox checked onChange={jest.fn()} /></div>)
    expect(findDOMNode(instance).querySelector('input').checked).toBe(true)
  })

  it('onChange is ok', () => {
    let flag
    const handleChange = jest.fn(e => {
      flag = e.target.checked
    })
    const instance = TestUtils.renderIntoDocument(<div><Checkbox onChange={handleChange} /></div>)
    TestUtils.Simulate.change(findDOMNode(instance).querySelector('input'), {
      target: {
        checked: true
      }
    })
    expect(handleChange).toBeCalled()
    expect(flag).toBe(true)
  })

  it('disabled is ok', () => {
    const instance = TestUtils.renderIntoDocument(<div><Checkbox disabled /></div>)
    expect(findDOMNode(instance).querySelector('input').disabled).toBe(true)
  })

  it('block is ok', () => {
    const instance = TestUtils.renderIntoDocument(<div><Checkbox block /></div>)
    expect(findDOMNode(instance).children[0].className.split(' ')).toContain('checkbox')
  })
})