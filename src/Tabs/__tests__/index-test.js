import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import { Tabs, TabList, Tab, TabPanel } from '../index'

describe('Tabs', () => {

  it('should default works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Tabs>
        <TabList>
          <Tab>a</Tab>
          <Tab>b</Tab>
        </TabList>
        <TabPanel>a</TabPanel>
        <TabPanel>b</TabPanel>
      </Tabs>
    )
    const container = findDOMNode(instance)
    const tabs = container.querySelectorAll('.bfd-tabs__tab')
    const panels = container.querySelectorAll('.bfd-tabs__panel')
    expect(tabs[0].className).toContain('active')
    expect(panels[0].className).toContain('active')
    TestUtils.Simulate.click(tabs[1].querySelector('a'))
    expect(tabs[1].className).toContain('active')
    expect(panels[1].className).toContain('active')
  })

  it('should activeIndex works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Tabs activeIndex={1}>
        <TabList>
          <Tab>a</Tab>
          <Tab>b</Tab>
        </TabList>
        <TabPanel>a</TabPanel>
        <TabPanel>b</TabPanel>
      </Tabs>
    )
    expect(findDOMNode(instance).querySelectorAll('.bfd-tabs__tab')[1].className).toContain('active')
  })

  it('should activeKey works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Tabs activeKey="b">
        <TabList>
          <Tab activeKey="a">a</Tab>
          <Tab activeKey="b">b</Tab>
        </TabList>
        <TabPanel activeKey="a">a</TabPanel>
        <TabPanel activeKey="b">b</TabPanel>
      </Tabs>
    )
    expect(findDOMNode(instance).querySelectorAll('.bfd-tabs__tab')[1].className).toContain('active')
  })

  it('should onChange works', () => {
    const handleChange = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Tabs onChange={handleChange}>
        <TabList>
          <Tab>a</Tab>
          <Tab>b</Tab>
        </TabList>
        <TabPanel>a</TabPanel>
        <TabPanel>b</TabPanel>
      </Tabs>
    )
    TestUtils.Simulate.click(findDOMNode(instance).querySelector('.bfd-tabs__tab > a'))
    expect(handleChange).toBeCalled(1, undefined)
  })

  it('should dynamic works', () => {
    const instance = TestUtils.renderIntoDocument(
      <Tabs dynamic>
        <TabList>
          <Tab>a</Tab>
          <Tab>b</Tab>
        </TabList>
        <TabPanel>a</TabPanel>
        <TabPanel>b</TabPanel>
      </Tabs>
    )
    expect(findDOMNode(instance).querySelector('.bfd-tabs__tab-remove')).not.toBeNull()
  })

  it('should handleClose works', () => {
    const handleClose = jest.fn()
    const instance = TestUtils.renderIntoDocument(
      <Tabs dynamic handleClose={handleClose}>
        <TabList>
          <Tab>a</Tab>
          <Tab>b</Tab>
        </TabList>
        <TabPanel>a</TabPanel>
        <TabPanel>b</TabPanel>
      </Tabs>
    )
    TestUtils.Simulate.click(findDOMNode(instance).querySelector('.bfd-tabs__tab-remove'))
    expect(handleClose).toBeCalled(0, undefined)
  })
})