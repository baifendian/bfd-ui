/**
 * bfd-ui DEMO、文档生成器，以 webpack loader 的方式动态编译
 */

'use strict'

const fs = require('fs')
const path = require('path')
const marked = require('marked')
const beautify = require('code-beautify')

marked.setOptions({
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
  imports.add(`import { Row, Col } from 'bfd/Layout'`)
  imports.add(`import Demo from 'public/Demo'`)
  imports.add(`import Doc from 'public/Doc'`)

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
      name: match.split('/').slice(-1)[0],
      props: [],
      apis: []
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

    // 组件 props
    match = sourceCode.match(/\.propTypes = ({[^]+\n})/)
    if (match) {
      match = match[1]
      const reg = /(\/\/|\/\*\*)([^]+?)(\w+):\s*PropTypes(.*)/g
      let res
      while (res = reg.exec(match)) {
        let desc = res[2] || ''
        if (desc) {
          desc = desc.trim().replace(/\*\/$/, '')
          desc = marked(desc.replace(/\r?\n?\s*\*\s?/g, '\r\n').trim())
        }
        doc.props.push({
          name: res[3],
          desc: desc,
          types: res[4].match(/string|bool|number|object|array|func|element/g),
          required: !!res[4].match(/isRequired/)
        })
      }
    }

    // API、组件对外的方法
    const apiReg = /\* @public([^]+?)\*\//g
    while(match = apiReg.exec(sourceCode)) {
      match = match[1]
      const api = {}
      const handleMap = {
        name: res => {
          api.name = res
        },
        type: res => {
          api.type = res
        },
        description: res => {
          api.desc = marked(res.replace(/\r?\n?\s*\*\s?/g, '\r\n').trim())
        },
        param: res => {
          const param = {}
          res = res.match(/(.*?\})\s*([\w\[\]]+)\s+([^]*)/)
          param.type = res[1]
          param.name = res[2]
          param.desc = marked(res[3].replace(/\r?\n?\s*\*\s?/g, '\r\n').trim())
          ;(api.params || (api.params = [])).push(param)
        },
        'return': res => {
          res = res.match(/(.*?\})\s*(.*)/)
          api.return = {
            type: res[1],
            desc: res[2].trim()
          }
        }
      }
      const reg = /([a-z]+)\s+([^]*)/
      match = match.split(/(\r?\n?) \* @/).slice(1)
      match.forEach(v => {
        v = v.match(reg)
        v && handleMap[v[1]] && handleMap[v[1]](v[2])
      })
      doc.apis.push(api)
    }

    docs.push(doc)
  }]
  const reg = /@title\s(.+)|@desc\s(.+)|(\nimport [^]+?\n})|@component\s(.+)/g
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

  let layout
  if (rightCol.length) {
    layout = (`
      <Row gutter>
        <Col col="md-6">${leftCol.join('\r\n')}</Col>
        <Col col="md-6">${rightCol.join('\r\n')}</Col>
      </Row>
    `)
  } else {
    layout = leftCol[0]
  }

  // 生成文档代码
  const componentsDocs = docs.map(doc => {
    return `<Doc key="${doc.name}" {...${doc}} />`
  })

  return `${imports.getAll().join('\r\n')} 

${codes.join('\r\n')}

const docs = ${JSON.stringify(docs)}

export default () => {
  return (
    <div>
      ${layout}
      {docs.map(doc => <Doc key={doc.name} {...doc} />)}
    </div>
  )
}`
}