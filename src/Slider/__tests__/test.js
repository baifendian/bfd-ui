import React from 'react'
import {
  findDOMNode
} from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Slider from '../index'

describe('Slider', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const handleSliding = jest.fn()
      const handleSlid = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <Slider className="test" end={100} suffix="%" onSliding={handleSliding} onSlid={handleSlid} />
      )
      const container = findDOMNode(instance)
      expect(container.className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const handleSliding = jest.fn()
      const handleSlid = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <Slider style={{color: 'red'}} end={100} suffix="%" onSliding={handleSliding} onSlid={handleSlid} />
      )
      const container = findDOMNode(instance)
      expect(container.style.color).toBe('red')
    })

    it('defaultValue is ok', () => {
      const handleSliding = jest.fn()
      const handleSlid = jest.fn()
      const value = 30
      const suffix = '%'
      const instance = TestUtils.renderIntoDocument(
        <Slider defaultValue={value} end={100} suffix={suffix} onSliding={handleSliding} onSlid={handleSlid} />
      )
      const container = findDOMNode(instance)
      const text = container.querySelector('.bar .slider .tooltips .text')
      expect(text.innerHTML).toEqual(value + suffix)
    })
  })
})