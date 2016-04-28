import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import RadioGroup from '../RadioGroup'
import Radio from '../Radio'

describe('Radio', () => {

  describe('Radio basic', () => {

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(
        <RadioGroup>
          <Radio value="a" className="test" />
        </RadioGroup>
      )
      expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'bfd-radio').className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(
        <RadioGroup>
          <Radio value="a" style={{color: 'red'}} />
        </RadioGroup>
      )
      expect(TestUtils.findRenderedDOMComponentWithClass(instance, 'bfd-radio').style.color).toBe('red')
    })

    it('onClick is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <RadioGroup>
          <Radio value="a" onClick={handleClick} />
        </RadioGroup>
      )
      TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(instance, 'bfd-radio'))
      expect(handleClick).toBeCalled()
    })
  })

  it('value is ok', () => {
    const instance = TestUtils.renderIntoDocument(
      <RadioGroup>
        <Radio value="test" />
      </RadioGroup>
    )
    expect(TestUtils.findRenderedDOMComponentWithTag(instance, 'input').value).toBe('test')
  })

  it('disabled is ok', () => {
    const instance = TestUtils.renderIntoDocument(
      <RadioGroup>
        <Radio value="test" disabled />
      </RadioGroup>
    )
    expect(TestUtils.findRenderedDOMComponentWithTag(instance, 'input').disabled).toBe(true)
  })
})


describe('RadioGroup', () => {

  describe('RadioGroup basic', () => {

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(<RadioGroup className="test" />)
      expect(findDOMNode(instance).className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(<RadioGroup style={{color: 'red'}} />)
      expect(findDOMNode(instance).style.color).toBe('red')
    })

    it('onClick is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(<RadioGroup onClick={handleClick} />)
      TestUtils.Simulate.click(findDOMNode(instance))
      expect(handleClick).toBeCalled()
    })
  })

  it('value is ok', () => {
    const instance = TestUtils.renderIntoDocument(
      <RadioGroup value="mi" onChange={jest.fn()}>
        <Radio value="apple">苹果</Radio>
        <Radio value="mi">小米</Radio>
      </RadioGroup>
    )
    expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1].checked).toBe(true)
  })

  it('onChange is ok', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <RadioGroup onChange={handleChange}>
        <Radio value="apple">苹果</Radio>
        <Radio value="mi">小米</Radio>
      </RadioGroup>
    )
    TestUtils.Simulate.change(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1], {
      target: {
        value: 'mi',
        checked: true
      }
    })
    expect(handleChange).toBeCalledWith('mi')
  })
})