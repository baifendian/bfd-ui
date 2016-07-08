import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import CheckboxGroup from '../CheckboxGroup'
import Checkbox from '../Checkbox'

describe('CheckboxGroup', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(<CheckboxGroup className="test" />)
      expect(findDOMNode(instance).className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(<CheckboxGroup style={{color: 'red'}} />)
      expect(findDOMNode(instance).style.color).toBe('red')
    })

    it('onClick is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(<CheckboxGroup onClick={handleClick} />)
      TestUtils.Simulate.click(findDOMNode(instance))
      expect(handleClick).toBeCalled()
    })
  })

  it('selects is ok', () => {
    const instance = TestUtils.renderIntoDocument(
      <CheckboxGroup selects={['apple', 'huawei']} onChange={jest.fn()}>
        <Checkbox value="apple">苹果</Checkbox>
        <Checkbox value="mi">小米</Checkbox>
        <Checkbox value="huawei">华为</Checkbox>
      </CheckboxGroup>
    )
    const checkboxes = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')
    expect(checkboxes[1].checked).toBe(true)
    expect(checkboxes[2].checked).toBe(false)
    expect(checkboxes[3].checked).toBe(true)
  })

  it('should change if selects change', () => {
    const Test = React.createClass({
      getInitialState() {
        return {
          selects: ['apple', 'huawei']  
        }
      },
      render() {
        return (
          <CheckboxGroup selects={this.state.selects} onChange={jest.fn()}>
            <Checkbox value="apple">苹果</Checkbox>
            <Checkbox value="mi">小米</Checkbox>
            <Checkbox value="huawei">华为</Checkbox>
          </CheckboxGroup>
        )
      }
    })
    const instance = TestUtils.renderIntoDocument(<Test />)
    instance.setState({selects: ['apple']})
    const checkboxes = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')
    expect(checkboxes[3].checked).toBe(false)
  })

  it('values is ok', () => {
    const instance = TestUtils.renderIntoDocument(<CheckboxGroup values={['苹果', '小米', '三星', '华为']}/>)
    const checkboxes = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')
    expect(checkboxes.length).toBe(5)
    expect(checkboxes[1].value).toBe('苹果')
  })

  it('onChange is ok', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <CheckboxGroup selects={['apple', 'mi']} onChange={handleChange}>
        <Checkbox value="apple">苹果</Checkbox>
        <Checkbox value="mi">小米</Checkbox>
        <Checkbox value="huawei">华为</Checkbox>
      </CheckboxGroup>
    )
    TestUtils.Simulate.change(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[1], {
      target: {
        value: 'apple',
        checked: false,
      }
    })
    expect(handleChange).toBeCalledWith(['mi'])
  })

  it('block is ok', () => {
    const instance = TestUtils.renderIntoDocument(<CheckboxGroup block values={['苹果', '小米', '三星', '华为']}/>)
    expect(TestUtils.scryRenderedDOMComponentsWithClass(instance, 'bfd-checkbox')[0].className.split(' ')).toContain('checkbox')
  })
})