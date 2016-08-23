import React from 'react'
import { findDOMNode } from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import TextOverflow from '../index'

describe('TextOverflow', () => {
  it('should className works', () => {
    const instance = TestUtils.renderIntoDocument(
      <div>
        <TextOverflow>
          <div>test</div>
        </TextOverflow>
      </div>
    )
    expect(findDOMNode(instance).children[0].className).toContain('bfd-text-overflow')
  })
})