import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Select, Option } from '../index'

describe('Select', () => {

  it('should value works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Select value="1" onChange={jest.fn()}>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </Select>
    )
    const selected = findDOMNode(instance).querySelector('.bfd-select__option--selected')
    expect(selected.textContent).toBe('三星')
  })

  it('should defaultValue works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Select defaultValue="1">
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </Select>
    )
    const selected = findDOMNode(instance).querySelector('.bfd-select__option--selected')
    expect(selected.textContent).toBe('三星')
  })

  it('should onChange works', () => {
    const handleChange = jest.fn()    
    const instance = TestUtils.renderIntoDocument(
      <Select onChange={handleChange}>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </Select>
    )
    const options = findDOMNode(instance).querySelectorAll('.bfd-select__option')
    TestUtils.Simulate.click(options[0])
    expect(handleChange).toBeCalledWith('0')
  })

  it('should data works', () => {
    const handleChange = jest.fn()    
    const instance = TestUtils.renderIntoDocument(
      <Select data={['a', 'b']} render={item => <Option>{item}</Option>} />
    )
    const options = findDOMNode(instance).querySelectorAll('.bfd-select__option')
    expect(options.length).toBe(2)
  })

  it('should searchable works', () => {
    const handleChange = jest.fn()    
    const instance = TestUtils.renderIntoDocument(
      <Select defaultValue="1" searchable>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </Select>
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: '1'
      }
    })
    expect(container.querySelectorAll('.bfd-select__option').length).toBe(1)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: '三'
      }
    })
    expect(container.querySelectorAll('.bfd-select__option').length).toBe(1)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: 'x'
      }
    })
    const options = container.querySelectorAll('.bfd-select__option')
    expect(options.length).toBe(1)
    expect(options[0].textContent).toBe('无选项')
  })

  it('should empty children works', () => {
    expect(() => {
      TestUtils.renderIntoDocument(<Select>{null}</Select>)
    }).not.toThrow()
  })
})