import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Radio from '../Radio'

describe('Radio', () => {

  it('value is ok', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <Radio value="test" />
      </div>
    )
    expect(findDOMNode(instance).querySelector('input').value).toBe('test')
  })

  it('disabled is ok', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <Radio value="test" disabled />
      </div>
    )
    expect(findDOMNode(instance).querySelector('input').disabled).toBe(true)
  })
})