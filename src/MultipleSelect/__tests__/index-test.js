import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { MultipleSelect, Option } from '../index'

describe('MultipleSelect', () => {

  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('should values works', () => {
    const instance = TestUtils.renderIntoDocument(
      <MultipleSelect values={['1', '2']} onChange={jest.fn()}>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </MultipleSelect>
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('.bfd-dropdown__toggle'))

    const checkboxes = document.querySelectorAll('.bfd-checkbox input:checked')
    const labels = container.querySelectorAll('.bfd-tag-list__item')
    expect(checkboxes.length).toBe(2)
    expect(labels.length).toBe(2)
  })

  it('should defaultValues works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <MultipleSelect defaultValues={['1', '2']}>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </MultipleSelect>
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('.bfd-dropdown__toggle'))

    const checkboxes = document.querySelectorAll('.bfd-checkbox input:checked')
    expect(checkboxes.length).toBe(2)
  })

  it('should search works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <MultipleSelect defaultValues={[1, 2]}>
        <Option value={0}>苹果</Option>
        <Option value={1}>三星</Option>
        <Option value={2}>小米</Option>
      </MultipleSelect>
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('.bfd-dropdown__toggle'))

    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: '1'
      }
    })
    expect(document.querySelectorAll('.bfd-checkbox').length).toBe(2)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: '小'
      }
    })
    expect(document.querySelectorAll('.bfd-checkbox').length).toBe(2)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: 'x'
      }
    })
    expect(document.querySelectorAll('.bfd-checkbox').length).toBe(0)
  })

  it('should onChange works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <MultipleSelect onChange={handleChange}>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </MultipleSelect>
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('.bfd-dropdown__toggle'))

    const checkboxes = document.querySelectorAll('.bfd-checkbox input')
    TestUtils.Simulate.change(checkboxes[1], {
      target: {
        checked: true
      }
    })
    expect(handleChange).toBeCalledWith(['0'])
  })

  it('should data works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <MultipleSelect data={['a', 'b']} render={item => <Option>{item}</Option>} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.click(container.querySelector('.bfd-dropdown__toggle'))

    const checkboxes = document.querySelectorAll('.bfd-checkbox')
    expect(checkboxes.length).toBe(3)
  })

  it('should tagable works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <MultipleSelect tagable />
    )
    const container = findDOMNode(instance)
    const searchInput = container.querySelector('input')

    TestUtils.Simulate.change(searchInput, {
      target: {
        value: 'a'
      }
    })
    TestUtils.Simulate.keyDown(searchInput, {
      key: 'Enter'
    })
    const labels = container.querySelectorAll('.bfd-tag-list__item')
    expect(labels.length).toBe(1)
  })

  it('should empty children works', () => {
    expect(() => {
      TestUtils.renderIntoDocument(
        <MultipleSelect>{null}</MultipleSelect>
      )
    }).not.toThrow()
  })
})
