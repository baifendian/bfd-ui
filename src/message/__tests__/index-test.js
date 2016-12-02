import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import message from '../index'

describe('message', () => {

  it('should success works', () => {
    document.body.innerHTML = ''
    message.success('test')
    expect(document.querySelector('.bfd-message--success')).not.toBeNull()
  })
})
