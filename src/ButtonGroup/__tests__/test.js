import React from 'react'
import {
  findDOMNode
} from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import ButtonGroup from '../index'
import Button from '../../Button/index'

describe('ButtonGroup', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <ButtonGroup defaultValue="2" className="test">
          <Button value="1">按钮一</Button>
          <Button value="2">按钮二</Button>
          <Button value="3">按钮三</Button>
          <Button value="4">按钮四</Button>
          <Button value="5">按钮五</Button>
        </ButtonGroup>
      )
      const container = findDOMNode(instance)
      expect(container.className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <ButtonGroup defaultValue="2" style={{color: 'red'}}>
          <Button value="1">按钮一</Button>
          <Button value="2">按钮二</Button>
          <Button value="3">按钮三</Button>
          <Button value="4">按钮四</Button>
          <Button value="5">按钮五</Button>
        </ButtonGroup>
      )
      const container = findDOMNode(instance)
      expect(container.style.color).toBe('red')
    })

    it('defaultValue is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <ButtonGroup defaultValue="2">
          <Button value="1">按钮一</Button>
          <Button value="2">按钮二</Button>
          <Button value="3">按钮三</Button>
          <Button value="4">按钮四</Button>
          <Button value="5">按钮五</Button>
        </ButtonGroup>
      )
      const container = findDOMNode(instance)
      const button = container.querySelectorAll('button')
      expect(button[1].className).toEqual('bfd-btn')
    })
  })

  describe('event test', () => {
    it('change is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <ButtonGroup defaultValue="2" onChange={handleClick}>
          <Button value="1">按钮一</Button>
          <Button value="2">按钮二</Button>
          <Button value="3">按钮三</Button>
          <Button value="4">按钮四</Button>
          <Button value="5">按钮五</Button>
        </ButtonGroup>
      )
      const container = findDOMNode(instance)
      const button = container.querySelectorAll('button')

      TestUtils.Simulate.click(button[0])
      expect(handleClick).toBeCalled()
      expect(handleClick.mock.calls.length).toBe(1)
      expect(handleClick.mock.calls[0][0]).toEqual("1")

      TestUtils.Simulate.click(button[1])
      expect(handleClick.mock.calls.length).toBe(2)
      expect(handleClick.mock.calls[1][0]).toEqual("2")
    })
  })
})