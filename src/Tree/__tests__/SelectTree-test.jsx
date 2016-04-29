import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import SelectTree from '../SelectTree'

describe('SelectTree', () => {

  describe('basic', () => {

    const data = []
    function handleChange() {}

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(<SelectTree data={data} onChange={handleChange} className="test" />)
      expect(ReactDOM.findDOMNode(instance).className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(<SelectTree data={data} onChange={handleChange} style={{color: 'red'}} />)
      expect(ReactDOM.findDOMNode(instance).style.color).toBe('red')
    })

    it('onClick is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(<SelectTree data={data} onChange={handleChange} onClick={handleClick} />)
      TestUtils.Simulate.click(ReactDOM.findDOMNode(instance))
      expect(handleClick).toBeCalled()
    })
  })


  it('checked initialize is ok', () => {
    const data = [{
      name: 'test',
      children: [{
        name: 'dsds',
        checked: true
      }]
    }, {
      name: 'dsds'
    }]
    const selectTree = TestUtils.renderIntoDocument(<SelectTree data={data} onChange={jest.fn()}/>)
    const checks = TestUtils.scryRenderedDOMComponentsWithTag(selectTree, 'input')
    expect(checks.filter(input => input.checked).length).toBe(1)
  })


  it('checked onChange is ok', () => {
    const Test = React.createClass({
      getInitialState() {
        return {
          data: [{
            name: 'test',
            children: [{
              name: 'dsds'
            }]
          }, {
            name: 'dsds'
          }]
        }
      },

      handleChange(data) {
        this.setState({ data })
      },
      
      render() {
        return <SelectTree data={this.state.data} onChange={this.handleChange} />
      }
    })
    const test = TestUtils.renderIntoDocument(<Test />)
    const checks = TestUtils.scryRenderedDOMComponentsWithTag(test, 'input')
    TestUtils.Simulate.change(checks[1], {target: {checked: true}})
    expect(checks.filter(input => input.checked).length).toBe(2)
  })
})