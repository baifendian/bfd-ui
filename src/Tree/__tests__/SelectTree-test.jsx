import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import SelectTree from '../SelectTree'

describe('SelectTree', () => {

  it('checked initialize', () => {
    const data = [{
      name: 'test',
      children: [{
        name: 'dsds',
        checked: true
      }]
    }, {
      name: 'dsds',
      
    }]
    const selectTree = TestUtils.renderIntoDocument(<SelectTree data={data} onChange={d => {data = d}}/>)
    const checks = TestUtils.scryRenderedDOMComponentsWithTag(selectTree, 'input')
    expect(checks.filter(input => input.checked).length).toBe(1)
  })

  it('checked change', () => {
    const data = [{
      name: 'test',
      children: [{
        name: 'dsds'
      }]
    }, {
      name: 'dsds',
      
    }]
    function render() {
      return TestUtils.renderIntoDocument(<SelectTree data={data} onChange={d => {data = d}}/>)
    }
    let selectTree = render()
    TestUtils.Simulate.click(TestUtils.scryRenderedDOMComponentsWithTag(selectTree, 'input')[1])
    // expect(TestUtils.scryRenderedDOMComponentsWithTag(selectTree, 'input')).toBe(1)
  })
})