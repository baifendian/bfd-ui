import React from 'react'
import {
  findDOMNode
} from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import {
  SplitPanel,
  SubSplitPanel
} from '../index'

describe('SplitPanel', () => {

  describe('basic', () => {

    it('className is ok', () => {
      const instance = TestUtils.renderIntoDocument(
        <SplitPanel direct="ver" className="test">
          <SubSplitPanel>
            <p>你好</p>
            <p>世界</p>
          </SubSplitPanel>
          <SubSplitPanel>
            <div>hello</div>
            <div>world</div>
          </SubSplitPanel>
        </SplitPanel>
      )
      expect(findDOMNode(instance).className.split(' ')).toContain('test')
    })

    it('style is ok', () => {
      const instance = TestUtils.renderIntoDocument(
        <SplitPanel direct="ver" style={{borderColor: 'red'}}>
          <SubSplitPanel>
            <p>你好</p>
            <p>世界</p>
          </SubSplitPanel>
          <SubSplitPanel>
            <div>hello</div>
            <div>world</div>
          </SubSplitPanel>
        </SplitPanel>
      )
      expect(findDOMNode(instance).style.borderColor).toBe('red')
    })
  })

  describe('SubSplitPanel', () => {
    it('set width is ok on ver', () => {
      const width = 200
      const instance = TestUtils.renderIntoDocument(
        <SplitPanel direct="ver">
          <SubSplitPanel width={width}>
            <p>你好</p>
            <p>世界</p>
          </SubSplitPanel>
          <SubSplitPanel>
            <div>hello</div>
            <div>world</div>
          </SubSplitPanel>
        </SplitPanel>
      )
      const container = findDOMNode(instance)
      const top = container.querySelectorAll('div')[0]
      expect(parseInt(top.style.width)).toEqual(width)
    })

    it('set height is ok on hor', () => {
      const height = 200
      const instance = TestUtils.renderIntoDocument(
        <SplitPanel direct="hor">
          <SubSplitPanel height={height}>
            <p>你好</p>
            <p>世界</p>
          </SubSplitPanel>
          <SubSplitPanel>
            <div>hello</div>
            <div>world</div>
          </SubSplitPanel>
        </SplitPanel>
      )
      const container = findDOMNode(instance)
      const top = container.querySelectorAll('div')[0]
      expect(parseInt(top.style.height)).toEqual(height)
    })
  })
})