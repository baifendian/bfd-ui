import React from 'react'
import Center from 'public/Center'
import Markdown from 'public/Markdown'
import html from '../../../GUIDE.md'

export default () => {
  return (
    <Center style={{margin: '20px 0'}}>
      <Markdown html={html} />
    </Center>
  )
}
