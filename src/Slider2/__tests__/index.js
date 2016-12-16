import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Slider from '../index'

describe('Slider2', () => {

  it('should defaultValue works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Slider defaultValue={3} max={10}></Slider>
    )
    const container = findDOMNode(instance)
    expect(container.querySelector('.bfd-slider2__range').style.width).toBe('30%')
  })

  it('should value works', () => {
    class App extends Component {
      constructor() {
        super()
        this.state = {
          value: 2
        }
      }
      componentDidMount() {
        this.setState({
          value: 3
        })
      }
      render() {
        const { value } = this.state
        return <Slider value={value} max={10} onChange={jest.fn()}></Slider>
      }
    }
    const instance = TestUtils.renderIntoDocument(<App />)
    const container = findDOMNode(instance)
    expect(container.querySelector('.bfd-slider2__range').style.width).toBe('30%')
  })
})
