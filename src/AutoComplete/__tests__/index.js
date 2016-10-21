import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import AutoComplete from '../index'

describe('AutoComplete', () => {

  it('should onChange works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <AutoComplete source={[]} onChange={handleChange} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: '1'
      }
    })
    expect(handleChange).toBeCalledWith('1')
  })

  it('should update works', () => {
    class App extends Component {
      constructor() {
        super()
        this.state = {
          source: []
        }
      }
      componentDidMount() {
        this.setState({
          value: 'a',
          source: ['test']
        })
      }
      render() {
        const { value, source } = this.state
        return <AutoComplete value={value} source={source} onChange={jest.fn()} />
      }
    }
    const instance = TestUtils.renderIntoDocument(<App />)
    const container = findDOMNode(instance)
    expect(container.querySelector('input').value).toBe('a')
    expect(container.querySelectorAll('.bfd-auto-complete__result li').length).toBe(1)
  })

  it('should search works', () => {
    const instance = TestUtils.renderIntoDocument(
      <AutoComplete source={['aa', 'bb']} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: 'a'
      }
    })
    expect(container.className).toContain('open')
    expect(container.querySelectorAll('ul li').length).toBe(1)
  })

  it('should tab works', () => {
    const instance = TestUtils.renderIntoDocument(
      <AutoComplete source={['aa', 'bb']} />
    )
    const container = findDOMNode(instance)
    TestUtils.Simulate.change(container.querySelector('input'), {
      target: {
        value: 'a'
      }
    })
    TestUtils.Simulate.keyDown(container.querySelector('input'), {
      key: 'ArrowDown'
    })
    expect(container.querySelectorAll('ul li')[0].className).toContain('active')
  })
})
