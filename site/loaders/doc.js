/**
 * bfd-ui DEMO、文档生成器，以 webpack loader 的方式动态编译
 */

'use strict'

const fs = require('fs')
const path = require('path')
const marked = require('marked')
const beautify = require('code-beautify')

const renderer = new marked.Renderer()
renderer.heading = (text, level) => {
  const id = text.split(' ')[0].replace(/<\/?.*?>\*?/g, '')
  return `<h${level} id="${id}">${text}</h${level}>`
}
marked.setOptions({
  renderer,
  sanitize: true,
  highlight: (code, lang) => beautify(code, lang)
})

// 智能添加依赖，自动规避重复声明
const imports = {

  list: [],

  variables: [],

  add(item) {
    let match = item.match(/import (.*?) from(.*)/)
    if (match) {
      const variables = match[1].split(/,|\{|\}/).map(v => v.trim())
      let hasNewVariate = false
      variables.forEach(v => {
        if (!v) return
        if (imports.variables.indexOf(v) === -1) {
          hasNewVariate = true
          imports.variables.push(v)
        } else {
          match[1] = match[1].replace(new RegExp(`\\b${v}\\b`), '')
        }
      })
      if (hasNewVariate) {
        match[1] = match[1].replace(/^\s*,|\{\s*,|,\s*\}/g, '')
        imports.list.push(`import ${match[1]} from${match[2]}`)
      }
    }
  },

  getAll() {
    return imports.list
  },

  reset() {
    imports.list = []
    imports.variables = []
  }
}

module.exports = function (source) {

  this.cacheable()

  imports.reset()

  // 依赖的公共模块
  imports.add(`import React, { Component } from 'react'`)
  imports.add(`import Markdown from 'public/Markdown'`)
  imports.add(`import Demo from 'public/Demo'`)

  function parse(file) {
    const markdown = fs.readFileSync(file, 'utf8')

    const regex = /@(\w+)\n```(\w+)([^]*?)```\s*\n/g
    const htmlFragments = []
    const jsFragments = []
    const getMarkdownHTMLFragment = (markdown, start, end) => {
      const markdownFragment = markdown.substring(start, end)
      const html = marked(markdownFragment).replace(/(`|\$)/g, '\\$1')
      return `<Markdown className="components__markdown" html={\`${html}\`} />`
    }

    let match
    let lastIndex = 0
    while (match = regex.exec(markdown)) {
      const [all, name, lang, code] = match
      const codeBody = code.replace(/import .*/g, match => {
        imports.add(match)
        return ''
      })
      const codeHighlight = beautify(code, lang).replace(/(`|\$)/g, '\\$1')
      jsFragments.push(codeBody)
      htmlFragments.push(
        getMarkdownHTMLFragment(markdown, lastIndex, match.index),
        `<Demo code={\`${codeHighlight}\`}><${name} /></Demo>`
      )
      lastIndex = regex.lastIndex
    }
    if (lastIndex < markdown.length) {
      htmlFragments.push(getMarkdownHTMLFragment(markdown, lastIndex, markdown.length))
    }
    const ComponentName = file.split('/').slice(-2)[0]
    return `
      components['${ComponentName}'] = () => {
        ${jsFragments.join('\n')}
        return (
          <div>${htmlFragments.join('\n')}</div>
        )
      }
    `
  }

  const componentsCodes = []

  const rootDir = path.join(__dirname, '../../src')
  fs.readdirSync(rootDir).forEach(dir => {
    const docFile = rootDir + '/' + dir + '/README.md'
    if (fs.existsSync(docFile)) {
      componentsCodes.push(parse(docFile))
    }
  })

  return `
    import Layout from './Layout'
    ${imports.getAll().join('\n')}
    import './index.less'

    const components = {}
    ${componentsCodes.join('\n')}

    export default props => {
      const ComponentName = props.params.component
      const Component = components[ComponentName]
      return (
        <Layout componentName={ComponentName}>
          {Component && <Component />}
        </Layout>
      )
    }
  `
}
