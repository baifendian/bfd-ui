import React from 'react'
import Center from 'public/Center'
import Markdown from 'public/Markdown'
import html from 'generator/CHANGELOG.md'

export default () => {
  return <Markdown html={html} />
}