import React from 'react'
import Center from 'public/Center'
import Markdown from 'public/Markdown'
import html from '../../../CHANGELOG.md'

export default () => {
  return (
    <Center>
      <Markdown html={html} />
    </Center>
  )
}