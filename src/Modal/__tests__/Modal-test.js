import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Modal from '../Modal'

describe('Modal', () => {

  it('should open works', () => {
    const instance = TestUtils.renderIntoDocument(<Modal open />)
    expect(findDOMNode(instance).querySelector('.bfd-modal')).not.toBeNull()
  })

  it('should onToggle works', () => {
    const handleToggle = jest.fn()
    const instance = TestUtils.renderIntoDocument(<Modal open onToggle={handleToggle} />)
    instance.open()
    expect(handleToggle).toBeCalledWith(true)
  })

  it('should close() works', () => {
    const instance = TestUtils.renderIntoDocument(<Modal open />)
    instance.close()
    expect(instance.state.open).toBe(false)
  })
})