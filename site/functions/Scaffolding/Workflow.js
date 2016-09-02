import React from 'react'
import Markdown from 'public/Markdown'
import html from 'generator/WORKFLOW.md'

export default () => {
  return <Markdown html={html} />
}