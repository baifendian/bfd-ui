import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { Nav, NavItem } from '../index'

describe('Nav', () => {

  it('index is ok', () => {
    function NavTest() {
      return (
        <Nav href="/">
          <NavItem />
        </Nav>
      )
    }
    const router = TestUtils.renderIntoDocument((
      <Router history={createHistory()}>
        <Route path="/" component={NavTest} />
      </Router>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(router, 'a')[0].href).toBe('/')
  })

  it('child href is ok', () => {
    function NavTest() {
      return (
        <Nav href="/">
          <NavItem href="test" />
        </Nav>
      )
    }
    const router = TestUtils.renderIntoDocument((
      <Router history={createHistory()}>
        <Route path="/" component={NavTest} />
      </Router>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(router, 'a')[0].href).toBe('/test')
  })

  it('Nav no href is ok', () => {
    function NavTest() {
      return (
        <Nav>
          <NavItem href="/test" />
        </Nav>
      )
    }
    const router = TestUtils.renderIntoDocument((
      <Router history={createHistory()}>
        <Route path="/" component={NavTest} />
      </Router>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(router, 'a')[0].href).toBe('/test')
  })

  it('child NavItem href is ok', () => {
    function NavTest() {
      return (
        <Nav href="/">
          <NavItem href="test">
            <NavItem href="test/aa" />
          </NavItem>
        </Nav>
      )
    }
    const router = TestUtils.renderIntoDocument((
      <Router history={createHistory()}>
        <Route path="/" component={NavTest} />
      </Router>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(router, 'a')[1].href).toBe('/test/aa')
  })

  it('NavItem close by default', () => {
    function NavTest() {
      return (
        <Nav href="/">
          <NavItem href="test">
            <NavItem href="test/aa" />
          </NavItem>
        </Nav>
      )
    }
    const router = TestUtils.renderIntoDocument((
      <Router history={createHistory()}>
        <Route path="/" component={NavTest} />
      </Router>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(router, 'li')[0].className).not.toContain('open')
  })

  it('NavItem defaultOpen is ok', () => {
    function NavTest() {
      return (
        <Nav href="/">
          <NavItem href="test" defaultOpen>
            <NavItem href="test/aa" />
          </NavItem>
        </Nav>
      )
    }
    const router = TestUtils.renderIntoDocument((
      <Router history={createHistory()}>
        <Route path="/" component={NavTest} />
      </Router>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(router, 'li')[0].className).toContain('open')
  })

  it('should open if active', () => {
    function NavTest() {
      return (
        <Nav href="/">
          <NavItem>
            <NavItem />
          </NavItem>
        </Nav>
      )
    }
    const router = TestUtils.renderIntoDocument((
      <Router history={createHistory()}>
        <Route path="/" component={NavTest} />
      </Router>
    ))
    expect(TestUtils.scryRenderedDOMComponentsWithTag(router, 'li')[0].className).toContain('open')
  })
})