import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Form, FormItem, FormInput } from '../index'

describe('Form', () => {

  it('should data works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Form data={{name: 'test'}} onChange={jest.fn()}>
        <FormItem name="name">
          <FormInput />
        </FormItem>
      </Form>
    )
    expect(findDOMNode(instance).querySelector('input').value).toBe('test')
  })

  it('should defaultData works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Form defaultData={{name: 'test'}}>
        <FormItem name="name">
          <FormInput />
        </FormItem>
      </Form>
    )
    expect(findDOMNode(instance).querySelector('input').value).toBe('test')
  })

  it('should onChange works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Form data={{name: 'test'}} onChange={handleChange}>
        <FormItem name="name">
          <FormInput />
        </FormItem>
      </Form>
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: 'test2'
      }
    })
    expect(handleChange).toBeCalledWith({name: 'test2'})
  })
})