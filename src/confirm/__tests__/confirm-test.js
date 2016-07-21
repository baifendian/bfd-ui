import React from 'react'
import TestUtils from 'react-addons-test-utils'
import confirm from '../index'

describe('confirm', () => {

  it('is ok', () => {
    const callback = jest.fn()
    confirm('test', callback)
    
    const node = document.body.lastElementChild
    expect(node.querySelector('.message').textContent).toBe('test')

    TestUtils.Simulate.click(node.querySelector('.btn-primary'))
    expect(callback).toBeCalled()
  })
})