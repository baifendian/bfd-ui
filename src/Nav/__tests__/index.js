import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { Nav, NavItem, IndexNavItem } from '../index'

Object.defineProperty(window.location, 'href', {
  writable: true,
  value: '/'
})

describe('Nav', () => {

  it('should href extends works', () => {

    let router = TestUtils.renderIntoDocument((
      <Router history={createHistory()}>
        <Route path="/" component={() => (
          <Nav href="/">
            <IndexNavItem defaultOpen>
              <NavItem href="test" />
            </IndexNavItem>
          </Nav>
        )} />
      </Router>
    ))
    const container = findDOMNode(router)
    expect(container.querySelectorAll('a')[1].href).toBe('/test')

    router = TestUtils.renderIntoDocument((
      <Router history={createHistory()}>
        <Route path="/" component={() => (
          <Nav>
            <NavItem href="/aa" />
          </Nav>
        )} />
      </Router>
    ))
    expect(findDOMNode(router).querySelector('a').href).toBe('/aa')
  })

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
    const router = TestUtils.renderIntoDocument((
      <Router history={createHistory()}>
        <Route path="/" component={() => (
          <Nav href="/">
            <IndexNavItem>
              <IndexNavItem />
            </IndexNavItem>
          </Nav>
        )} />
      </Router>
    ))
    expect(findDOMNode(router).querySelector('li').className).toContain('open')
  })
})