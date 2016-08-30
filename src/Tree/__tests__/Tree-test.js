import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Tree from '../Tree'

describe('Tree', () => {

  const data = [{
    name: 'a',
    children: [{
      name: 'a0'
    }]
  }, {
    name: 'b'
  }]

  it('should data works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Tree data={data} onChange={jest.fn()} />
    )
    expect(findDOMNode(instance).querySelectorAll('.bfd-tree__node').length).toBe(3)
  })

  it('should defaultData works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Tree defaultData={data} />
    )
    expect(findDOMNode(instance).querySelectorAll('.bfd-tree__node').length).toBe(3)
  })

  it('should toggle works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Tree defaultData={data} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('.bfd-tree__node-toggle'))
    expect(container.querySelector('.bfd-tree__node').className).toContain('open')
  })

  it('should custom render works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Tree defaultData={data} render={item => item.name + '-' } />
    )
    expect(findDOMNode(instance).querySelector('.bfd-tree__node-content').textContent).toBe('a-')
  })

  it('should custom render arguments works', () => {
    const handleRender = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Tree defaultData={data} render={handleRender} />
    )
    expect(handleRender).toBeCalledWith({
      name: 'b'
    }, [1])
  })

  it('should getIcon works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Tree defaultData={data} getIcon={() => 'folder'} />
    )
    expect(findDOMNode(instance).querySelector('.bfd-tree__node-type').className).toContain('folder')
  })

  it('should getIcon arguments works', () => {
    const handleGetIcon = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Tree defaultData={data} getIcon={handleGetIcon} />
    )
    expect(handleGetIcon).toBeCalledWith({
      name: 'b'
    })
  })

  it('should onActive arguments works', () => {
    const handleActive = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Tree defaultData={data} onActive={handleActive} />
    )
    TestUtils.Simulate.click(findDOMNode(instance).querySelector('.bfd-tree__node-content'))
    expect(handleActive).toBeCalledWith([{
      name: 'a',
      active: true,
      children: [{
        name: 'a0'
      }]
    }])
  })
})