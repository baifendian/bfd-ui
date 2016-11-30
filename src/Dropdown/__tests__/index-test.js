import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Dropdown from '../Dropdown'
import DropdownToggle from '../DropdownToggle'
import DropdownMenu from '../DropdownMenu'

describe('Dropdown', () => {

  it('should open works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Dropdown open onToggle={jest.fn()}>
        <DropdownToggle />
        <DropdownMenu />
      </Dropdown>
    )
    expect(findDOMNode(instance).className).toContain('open')
  })

  it('should onToggle works', () => {
    const handleToggle = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Dropdown onToggle={handleToggle}>
        <DropdownToggle />
        <DropdownMenu />
      </Dropdown>
    )
    TestUtils.Simulate.click(findDOMNode(instance).querySelector('.bfd-dropdown__toggle'))
    expect(handleToggle).toBeCalledWith(true)
  })

  it('should disabled works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Dropdown disabled>
        <DropdownToggle />
        <DropdownMenu />
      </Dropdown>
    )
    expect(findDOMNode(instance).className).toContain('disabled')
  })
})
