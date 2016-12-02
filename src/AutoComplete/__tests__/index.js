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
    document.body.innerHTML = ''
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
    TestUtils.Simulate.click(container.querySelector('input'))
    expect(document.querySelectorAll('.bfd-auto-complete__result li').length).toBe(1)
  })

  it('should search works', () => {
    document.body.innerHTML = ''
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
    expect(document.querySelectorAll('.bfd-auto-complete__result li').length).toBe(1)
  })

  it('should tab works', () => {
    document.body.innerHTML = ''
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
    expect(document.querySelectorAll('.bfd-auto-complete__result li')[0].className).toContain('active')
  })
})
