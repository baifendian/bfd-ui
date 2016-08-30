import React from 'react'
import Center from 'public/Center'
import Markdown from 'public/Markdown'
import html from '../../../../generator-bfd/README.md'

export default () => {
  return (
    <Center>
      <Markdown html={html} />
    </Center>
  )
}