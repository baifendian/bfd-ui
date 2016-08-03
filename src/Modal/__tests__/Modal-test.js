import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Modal from '../Modal'

describe('Modal', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(<Modal className="test"/>)
      instance.open()
      expect(ReactDOM.findDOMNode(instance).children[0].className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(<Modal style={{color: 'red'}} />)
      instance.open()
      expect(ReactDOM.findDOMNode(instance).children[0].style.color).toBe('red')
    })

    it('onClick is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(<Modal onClick={handleClick} />)
      instance.open()
      TestUtils.Simulate.click(ReactDOM.findDOMNode(instance).children[0])
      expect(handleClick).toBeCalled()
    })
  })

  it('close is ok', () => {
    const instance = TestUtils.renderIntoDocument(<Modal className="test"/>)
    instance.open()
    instance.close()
    expect(instance.state.open).toBe(false)
  })
})