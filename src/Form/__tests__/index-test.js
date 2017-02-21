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


  it('should init works',() => {
    const rules = {
      name(v) {
        if (!v) return 'error'
      }
    }
    const TestParent = React.createFactory(React.createClass({
      getInitialState() {
        return { data: {name: 'test'} };
      },
      onChange(data){
        this.setState({data:data})
      },
      render() {
        return (
          <Form ref="testForm" data={this.state.data} onChange={this.onChange} rules={rules}>
            <FormItem ref="testFormItem" name="name">
              <FormInput />
            </FormItem>
          </Form>
        )
      }
    }));

    const instance = TestUtils.renderIntoDocument(TestParent())
    const container = findDOMNode(instance)
    expect(container.querySelector('input').value).toBe('test')
    instance.onChange({name:''})
    expect(findDOMNode(instance).querySelector('input').value).toBe('')
    expect(instance.refs.testFormItem.state.error).toBe('error')
    instance.refs.testForm.init()
    expect(instance.refs.testFormItem.state.error).toBe(null)
    expect(container.querySelector('input').value).toBe('')
    instance.onChange({name:''})
    expect(findDOMNode(instance).querySelector('input').value).toBe('')
    expect(instance.refs.testFormItem.state.error).toBe('error')
    instance.onChange({name:'test1111'})
    expect(findDOMNode(instance).querySelector('input').value).toBe('test1111')
    expect(instance.refs.testFormItem.state.error).toBe(undefined)
  })

  it('should validate works',() => {
    const rules = {
      name(v) {
        if (!v) return 'error'
      }
    }
    const TestParent = React.createFactory(React.createClass({
      getInitialState() {
        return { data: {name: 'test'} };
      },
      onChange(data){
        this.setState({data:data})
      },
      render() {
        return (
          <Form ref="testForm" data={this.state.data} onChange={this.onChange} rules={rules}>
            <FormItem ref="testFormItem" name="name">
              <FormInput />
            </FormItem>
          </Form>
        )
      }
    }));

    const instance = TestUtils.renderIntoDocument(TestParent())
    instance.onChange({name:''})
    expect(findDOMNode(instance).querySelector('input').value).toBe('')
    expect(instance.refs.testFormItem.state.error).toBe('error')

  })
})
