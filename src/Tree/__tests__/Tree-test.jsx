import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Tree from '../Tree'

describe('Tree', () => {

  describe('basic', () => {

    const data = []

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(<Tree data={data} className="test" />)
      expect(ReactDOM.findDOMNode(instance).className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(<Tree data={data} style={{color: 'red'}} />)
      expect(ReactDOM.findDOMNode(instance).style.color).toBe('red')
    })

    it('onClick is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(<Tree data={data} onClick={handleClick} />)
      TestUtils.Simulate.click(ReactDOM.findDOMNode(instance))
      expect(handleClick).toBeCalled()
    })
  })


  describe('open/name/loopData', () => {
    const data = [{
      name: 'test1',
      open: true,
      children: [{
        name: 'test1.1'
      }]
    }, {
      name: 'test2'
    }]
    const tree = TestUtils.renderIntoDocument(<Tree data={data} />)

    it('open is ok', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(tree, 'li')[0].className.split(' ')).toContain('open')
    })

    it('name is ok', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(tree, 'node-content')[0].textContent).toBe('test1')
    })
    
    it('loopData is ok', () => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(tree, 'li').length).toBe(3)
    })
  })


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
    const toggles = TestUtils.scryRenderedDOMComponentsWithClass(tree, 'toggle')
    TestUtils.Simulate.click(toggles[0])
    expect(data[0].open).toBe(true)
  })
})