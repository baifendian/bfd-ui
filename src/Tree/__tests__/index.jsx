jest.unmock('../Tree')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Tree from '../Tree'

describe('Tree', () => {
  it('adds 2 + 2 to equal 3', () => {
    const data = [{
      name: 'a'
    }]
    const test = TestUtils.renderIntoDocument(<Tree data={data} />)
    // const testNode = ReactDOM.findDOMNode(test)
    // expect(testNode.textContent).toEqual('hello')
  })
})