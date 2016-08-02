import React from 'react'
import TestUtils from 'react-addons-test-utils'
import confirm from '../index'

describe('confirm', () => {

  it('is ok', () => {
    const callback = jest.fn()
    confirm('test', callback)
    
    const node = document.body.lastElementChild
    expect(node.querySelector('.bfd-confirm__message').textContent).toBe('test')

    TestUtils.Simulate.click(node.querySelector('.bfd-confirm__operate .bfd-btn'))
    expect(callback).toBeCalled()
  })
})