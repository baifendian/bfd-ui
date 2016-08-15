import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import CheckboxGroup from '../CheckboxGroup'
import Checkbox from '../Checkbox'

describe('CheckboxGroup', () => {

  it('should selects works', () => {
    const instance = TestUtils.renderIntoDocument(
      <CheckboxGroup selects={['a']} onChange={jest.fn()}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    )
    const inputs = findDOMNode(instance).querySelectorAll('input')
    expect(inputs[0].checked).toBe(true)
    expect(inputs[1].checked).toBe(false)
  })

  it('should defaultSelects works', () => {
    const instance = TestUtils.renderIntoDocument(
      <CheckboxGroup defaultSelects={['a']} onChange={jest.fn()}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    )
    const inputs = findDOMNode(instance).querySelectorAll('input')
    expect(inputs[0].checked).toBe(true)
    expect(inputs[1].checked).toBe(false)
  })

  it('should values works', () => {
    const instance = TestUtils.renderIntoDocument(<CheckboxGroup values={['a', 'b']}/>)
    const inputs = findDOMNode(instance).querySelectorAll('input')
    expect(inputs.length).toBe(2)
  })

  it('should onChange works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <CheckboxGroup selects={['a', 'b']} onChange={handleChange}>
        <Checkbox value="a">A</Checkbox>
        <Checkbox value="b">B</Checkbox>
      </CheckboxGroup>
    )
    TestUtils.Simulate.change(findDOMNode(instance).querySelector('input'), {
      target: {
        value: 'a',
        checked: false
      }
    })
    expect(handleChange).toBeCalledWith(['b'])
  })

  it('should block works', () => {
    const instance = TestUtils.renderIntoDocument(<CheckboxGroup block values={['a', 'b']}/>)
    expect(findDOMNode(instance).children[0].className).toContain('block')
  })
})