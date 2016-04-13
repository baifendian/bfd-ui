import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import SelectTree from '../SelectTree'

describe('SelectTree', () => {

  it('checked initialize', () => {
    const data = [{
      name: 'test',
      children: [{
        name: 'dsds',
        checked: true
      }]
    }, {
      name: 'dsds'
      
    }]
    const selectTree = TestUtils.renderIntoDocument(<SelectTree data={data} onChange={d => {}}/>)
    const checks = TestUtils.scryRenderedDOMComponentsWithTag(selectTree, 'input')
    expect(checks.filter(input => input.checked).length).toBe(1)
  })

  it('checked change', () => {
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