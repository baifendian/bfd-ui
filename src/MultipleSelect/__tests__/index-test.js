import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { MultipleSelect, Option } from '../index'

describe('MultipleSelect', () => {

  it('onChange is ok', () => {
    const handleChange = jest.fn()    
    const instance = TestUtils.renderIntoDocument(
      <MultipleSelect defaultValues={['1', '2']} onChange={handleChange}>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </MultipleSelect>)

    const checkboxes = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')
    TestUtils.Simulate.change(checkboxes[1], {
      target: {
        checked: true
      }
    })
    expect(handleChange).toBeCalledWith(['1', '2', '0'])
  })

  it('empty children is ok', () => {
    TestUtils.renderIntoDocument(
      <MultipleSelect>
        {null}
      </MultipleSelect>)
  })
})