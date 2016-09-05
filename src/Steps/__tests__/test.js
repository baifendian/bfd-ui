import React from 'react'
import {
  findDOMNode
} from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import {
  Steps,
  Step
} from '../index'

describe('Steps', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <Steps className="test" onStepClick={handleClick} height={70} current={1}>
          <Step title="配置推荐栏" />
          <Step title="配置推荐策略" />
          <Step title="配置算法" />
          <Step title="配置规则" icon="user" />
          <Step title="配置样式" icon="cogs" />
        </Steps>
      )
      const container = findDOMNode(instance)
      expect(container.className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <Steps style={{color: 'red'}} onStepClick={handleClick} height={70} current={1}>
          <Step title="配置推荐栏" />
          <Step title="配置推荐策略" />
          <Step title="配置算法" />
          <Step title="配置规则" icon="user" />
          <Step title="配置样式" icon="cogs" />
        </Steps>
      )
      const container = findDOMNode(instance)
      expect(container.style.color).toBe('red')
    })

    it('height is ok', () => {
      const handleClick = jest.fn()
      const height = 100
      const instance = TestUtils.renderIntoDocument(
        <Steps onStepClick={handleClick} height={height} current={1}>
          <Step title="配置推荐栏" />
          <Step title="配置推荐策略" />
          <Step title="配置算法" />
          <Step title="配置规则" icon="user" />
          <Step title="配置样式" icon="cogs" />
        </Steps>
      )
      const container = findDOMNode(instance)
      expect(parseInt(container.style.height)).toBe(height)
    })

    it('icon is ok', () => {
      const handleClick = jest.fn()
      const height = 100
      const instance = TestUtils.renderIntoDocument(
        <Steps onStepClick={handleClick} height={height} current={0}>
          <Step title="配置规则" icon="user" />
          <Step title="配置样式" icon="cogs" />
        </Steps>
      )
      const container = findDOMNode(instance)
      const circles = container.querySelectorAll('.bfd-icon')
      expect(circles[0].className.split(' ')).toContain('fa-user')
    })
  })

  describe('event test', () => {
    it('click is ok', () => {
      const handleClick = jest.fn()
      const instance = TestUtils.renderIntoDocument(
        <Steps onStepClick={handleClick} height={100} current={1}>
          <Step title="配置推荐栏" />
          <Step title="配置推荐策略" />
          <Step title="配置算法" />
          <Step title="配置规则" icon="user" />
          <Step title="配置样式" icon="cogs" />
        </Steps>
      )
      const container = findDOMNode(instance)
      const circle = container.querySelectorAll('.bfd-steps__box--circle')

      TestUtils.Simulate.click(circle[0])
      expect(handleClick).toBeCalled()
      expect(handleClick.mock.calls.length).toBe(1)
      expect(handleClick.mock.calls[0][0]).toEqual(0)
      expect(handleClick.mock.calls[0][1]).toEqual('配置推荐栏')

      TestUtils.Simulate.click(circle[1])
      expect(handleClick.mock.calls.length).toBe(2)
      expect(handleClick.mock.calls[1][0]).toEqual(1)
      expect(handleClick.mock.calls[1][1]).toEqual('配置推荐策略')
    })
  })
})