import React from 'react'
import Markdown from 'public/Markdown'
import html from 'generator/DOCS.md'

export default () => {
  return <Markdown html={html} />
}