import React from 'react'
import Center from 'public/Center'
import Markdown from 'public/Markdown'
import html from '../../../README.md'

export default () => {
  return (
    <Center>
      <Markdown html={html} />
    </Center>
  )
}
