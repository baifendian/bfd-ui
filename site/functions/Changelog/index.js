import React from 'react'
import Center from 'public/Center'
import Changelog from 'public/Changelog'
import html from '../../../CHANGELOG.md'

export default () => {
  return (
    <Center>
      <Changelog html={html} />
    </Center>
  )
}