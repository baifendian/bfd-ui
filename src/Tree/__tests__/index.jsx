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
    function render() {
      return TestUtils.renderIntoDocument(<Tree data={data} />)
    }
    const tree = render()
    const testNode = ReactDOM.findDOMNode(tree)
    console.log(TestUtils.findRenderedDOMComponentWithTag(tree, 'li'))
    // expect(testNode.textContent).toEqual('hello')
  })
})