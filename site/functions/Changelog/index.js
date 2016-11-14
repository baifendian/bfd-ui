import React from 'react'
import Center from 'public/Center'
import Changelog from 'public/Changelog'
import html from '../../../CHANGELOG.md'

export default () => {
  return (
    <Center style={{margin: '20px 0'}}>
      <Changelog html={html} />
    </Center>
  )
}
