import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Modal from '../Modal'

describe('Modal', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(<Modal open className="test"/>)
      expect(ReactDOM.findDOMNode(instance).firstElementChild.className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(<Modal open style={{color: 'red'}} />)
      expect(ReactDOM.findDOMNode(instance).firstElementChild.style.color).toContain('red')
    })

    it('onClick is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(<Modal open onClick={handleClick} />)
      TestUtils.Simulate.click(ReactDOM.findDOMNode(instance).firstElementChild)
      expect(handleClick).toBeCalled()
    })
  })
})