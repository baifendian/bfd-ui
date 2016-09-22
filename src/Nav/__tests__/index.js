import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Nav, NavItem, IndexNavItem } from '../index'

Object.defineProperty(window.location, 'href', {
  writable: true,
  value: '/'
})

describe('Nav', () => {

  it('should defaultOpen works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Nav href="/">
        <IndexNavItem defaultOpen>
          <IndexNavItem href="test" />
        </IndexNavItem>
      </Nav>
    )
    expect(findDOMNode(instance).querySelector('li').className).toContain('open')
  })

  it('should open if active', () => {
    const instance = TestUtils.renderIntoDocument(
      <Nav href="/">
        <IndexNavItem>
          <IndexNavItem />
        </IndexNavItem>
      </Nav>
    )
    expect(findDOMNode(instance).querySelector('li').className).toContain('open')
  })
})