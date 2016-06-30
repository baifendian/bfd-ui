import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Nav, NavItem } from '../index'

describe('Nav', () => {

  it('index is ok', () => {
    const nav = TestUtils.renderIntoDocument((
      <Nav href="/">
        <NavItem />
      </Nav>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(nav, 'a')[0].href).toBe('/')
  })

  it('child href is ok', () => {
    const nav = TestUtils.renderIntoDocument((
      <Nav href="/">
        <NavItem href="test" />
      </Nav>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(nav, 'a')[0].href).toBe('/test')
  })

  it('Nav no href is ok', () => {
    const nav = TestUtils.renderIntoDocument((
      <Nav>
        <NavItem href="/test" />
      </Nav>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(nav, 'a')[0].href).toBe('/test')
  })

  it('child NavItem href is ok', () => {
    const nav = TestUtils.renderIntoDocument((
      <Nav href="/">
        <NavItem href="test">
          <NavItem href="test/aa" />
        </NavItem>
      </Nav>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(nav, 'a')[1].href).toBe('/test/aa')
  })
})