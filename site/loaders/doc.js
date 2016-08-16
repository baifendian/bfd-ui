/**
 * bfd-ui DEMO、文档生成器，以 webpack loader 的方式动态编译
 */

'use strict'

const fs = require('fs')
const path = require('path')

// 智能添加依赖，自动规避重复声明
const imports = {
  
  list: [],

  variables: [],
  
  add(item) {
    let match = item.match(/import (.*)+ from(.*)/)
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
  imports.add(`import React from 'react'`)
  imports.add(`import { Row, Col } from 'bfd/Layout'`)
  imports.add(`import { Props, Prop } from 'public/Props'`)
  imports.add(`import Demo from 'public/Demo'`)

  // 获取 DEMO、文档数据
  const demos = []
  const docs = []
  const callbacks = [match => {
    demos.push({
      title: match
    })
  }, match => {
    demos[demos.length - 1].desc = match
  }, match => {
    const currentDemo = demos[demos.length - 1]
    currentDemo.code = match.trim()
    const _imports = match.match(/import .*/g)
    if (_imports) {
      _imports.forEach(item => {
        imports.add(item.trim())
      })
      currentDemo.mainCode = currentDemo.code.replace(/import .*/g, '').trim()
    }
    currentDemo.name = currentDemo.mainCode.match(/(?:const|class)\s(\w+)/)[1]
  }, match => {
    // 文档
    const doc = {
      tag: match.split('/').slice(-1)[0],
      props: []
    }
    let dir = path.join(__dirname, '../../src/' + match)
    try {
      if (fs.statSync(dir).isDirectory()) {
        dir += '/index.js'
      } else {
        dir += '.js'
      }
    } catch(e) {
      dir += '.js'
    }
    
    const sourceCode = fs.readFileSync(dir, 'utf8')
    match = sourceCode.match(/\.propTypes = ({[\s\S]+\n})/)
    if (match) {
      match = match[1]
      const reg = /(\/\/[\s\S]+?)?(\w+):\s*PropTypes(.*)/g
      let res
      while (res = reg.exec(match)) {
        doc.props.push({
          name: res[2],
          desc: (res[1] || '').replace('//', '').trim(),
          types: res[3].match(/string|bool|number|object|array|func/g),
          required: !!res[3].match(/isRequired/)
        })
      }
    }
    docs.push(doc)
  }]
  const reg = /@title\s(.+)|@desc\s(.+)|(\nimport [\s\S]+?\n})|@component\s(.+)/g
  source.replace(reg, (match, p1, p2, p3, p4) => {
    [p1, p2, p3, p4].forEach((match, i) => {
      match && callbacks[i](match)
    })    
  })

  // 提前声明
  const codes = demos.map(demo => {
    const code = demo.code.replace(/`/g, '\\\`').replace(/\$\{/g, '\\\${')
    return `const code${demo.name} = \`${code}\`
${demo.mainCode}`
  })

  // 生成布局代码
  const leftCol = []
  const rightCol = []
  demos.forEach((demo, i) => {
    const code = (`
      <Demo title="${demo.title}" code={code${demo.name}} desc="${demo.desc || ''}">
        <${demo.name} />
      </Demo>
    `)
    i % 2 === 0 ? leftCol.push(code) : rightCol.push(code)
  })
  const layout = (`
    <Row gutter>
      <Col col="md-6">${leftCol.join('\r\n')}</Col>
      <Col col="md-6">${rightCol.join('\r\n')}</Col>
    </Row>
  `)

  // 生成文档代码
  const componentsProps = docs.map(doc => {
    const props = doc.props.map(prop => {
      return `<Prop name="${prop.name}" type="${prop.types}" required={${prop.required}}>${prop.desc}</Prop>`
    })
    return (`
      <Props tag="${doc.tag}">
        ${props.join('\r\n')}
      </Props>
    `)
  })

  return `${imports.getAll().join('\r\n')} 

${codes.join('\r\n')}

export default () => {
  return (
    <div>
      ${layout}
      ${componentsProps.join('\r\n')}
    </div>
  )
}`
}