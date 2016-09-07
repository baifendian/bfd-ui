import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Checkbox from '../Checkbox'

describe('Checkbox', () => {

  it('should value works', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <Checkbox value="test" />
      </div>
    )
    expect(findDOMNode(instance).querySelector('input').value).toBe('test')
  })

  it('should checked works', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <Checkbox checked onChange={jest.fn()} />
      </div>
    )
    expect(findDOMNode(instance).querySelector('input').checked).toBe(true)
  })

  it('should defaultChecked works', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <Checkbox defaultChecked />
      </div>
    )
    expect(findDOMNode(instance).querySelector('input').checked).toBe(true)
  })

  it('should onChange works', () => {
    const change = jest.fn()
    const handleChange = e => {
      change(e.target.checked)
    }
    const instance = TestUtils.renderIntoDocument(
      <div>
        <Checkbox onChange={handleChange} />
      </div>
    )
    TestUtils.Simulate.change(findDOMNode(instance).querySelector('input'), {
      target: {
        checked: true
      }
    })
    expect(change).toBeCalledWith(true)
  })

  it('should disabled works', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <Checkbox disabled />
      </div>
    )
    expect(findDOMNode(instance).querySelector('input').disabled).toBe(true)
  })

  it('should block works', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <Checkbox block />
      </div>
    )
    expect(findDOMNode(instance).children[0].className).toContain('block')
  })
})