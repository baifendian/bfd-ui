import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Dropdown from '../Dropdown'
import DropdownToggle from '../DropdownToggle'

describe('Dropdown', () => {

  it('should open works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Dropdown open onChange={jest.fn()} />
    )
    expect(findDOMNode(instance).className).toContain('open')
  })

  it('should onToggle works', () => {
    const handleToggle = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Dropdown onToggle={handleToggle}>
        <DropdownToggle />
      </Dropdown>
    )
    TestUtils.Simulate.click(findDOMNode(instance).querySelector('.bfd-dropdown__toggle'))
    expect(handleToggle).toBeCalledWith(true)
  })

  it('should disabled works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Dropdown disabled/>
    )
    expect(findDOMNode(instance).className).toContain('disabled')
  })
})