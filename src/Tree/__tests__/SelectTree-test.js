import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import SelectTree from '../SelectTree'

describe('SelectTree', () => {

  describe('basic', () => {

    const data = []
    function handleChange() {}

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(<SelectTree data={data} onChange={handleChange} className="test" />)
      expect(ReactDOM.findDOMNode(instance).className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(<SelectTree data={data} onChange={handleChange} style={{color: 'red'}} />)
      expect(ReactDOM.findDOMNode(instance).style.color).toBe('red')
    })

    it('onClick is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(<SelectTree data={data} onChange={handleChange} onClick={handleClick} />)
      TestUtils.Simulate.click(ReactDOM.findDOMNode(instance))
      expect(handleClick).toBeCalled()
    })
  })
})