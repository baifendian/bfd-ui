import React from 'react'
import Changelog from 'public/Changelog'
import html from 'generator/CHANGELOG.md'

export default () => {
  return <Changelog html={html} />
}