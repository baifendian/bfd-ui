import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Tree from '../Tree'
import TreeNode from '../TreeNode'

describe('Tree', () => {

  it('loopData is ok', () => {
    const data = [{
      name: 'test',
      children: [{
        name: 'dsds'
      }]
    }, {
      name: 'dsds'
    }]
    const tree = TestUtils.renderIntoDocument(<Tree data={data} />)
    expect(TestUtils.scryRenderedDOMComponentsWithTag(tree, 'li').length).toBe(3)
  })

  it('throw error if no name col', () => {
    const data = [{
      _name: 'test'
    }]
    function render() {
      const tree = TestUtils.renderIntoDocument(<Tree data={data} />)  
    }
    expect(render).toThrow()
  })

  it('toggle is ok', () => {
    const data = [{
      name: 'test',
      children: [{
        name: 'dsds'
      }]
    }, {
      name: 'dsds'
    }]
    const tree = TestUtils.renderIntoDocument(<Tree data={data} />)
    const firstToggleNode = TestUtils.scryRenderedDOMComponentsWithTag(tree, 'button')[0]
    TestUtils.Simulate.click(firstToggleNode)
    expect(TestUtils.scryRenderedComponentsWithType(tree, TreeNode)[0].state.isOpen).toBe(true)
  })
})