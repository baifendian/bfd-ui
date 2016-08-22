import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import message from '../index'

describe('message', () => {

  xit('should success works', () => {
    message.success('test')
    expect(document.querySelector('.bfd-message--success')).not.toBeNull()
  })
})