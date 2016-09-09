import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import RadioGroup from '../RadioGroup'
import Radio from '../Radio'

describe('RadioGroup', () => {

  it('value is ok', () => {
    const instance = TestUtils.renderIntoDocument(
      <RadioGroup value="mi" onChange={jest.fn()}>
        <Radio value="apple">苹果</Radio>
        <Radio value="mi">小米</Radio>
      </RadioGroup>
    )
    expect(findDOMNode(instance).querySelectorAll('input')[1].checked).toBe(true)
  })

  it('onChange is ok', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <RadioGroup onChange={handleChange}>
        <Radio value="apple">苹果</Radio>
        <Radio value="mi">小米</Radio>
      </RadioGroup>
    )
    TestUtils.Simulate.change(findDOMNode(instance).querySelectorAll('input')[1], {
      target: {
        value: 'mi',
        checked: true
      }
    })
    expect(handleChange).toBeCalledWith('mi')
  })
})