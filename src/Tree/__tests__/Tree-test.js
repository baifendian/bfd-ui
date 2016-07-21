import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Tree from '../Tree'

describe('Tree', () => {

  it('onChange is ok', () => {
    let data = [{
      name: 'test',
      children: [{
        name: 'dsds'
      }]
    }, {
      name: 'dsds'
    }]
    const tree = TestUtils.renderIntoDocument(<Tree data={data} onChange={d => {data = d}} />)
    const toggles = TestUtils.scryRenderedDOMComponentsWithClass(tree, 'icon-toggle')
    TestUtils.Simulate.click(toggles[0])
    expect(data[0].open).toBe(true)
  })
})