/**
 * bfd-ui DEMO、文档生成器，以 webpack loader 的方式动态编译
 */

module.exports = function (source) {

  this.cacheable()

  // 依赖的模块
  const imports = [
    `import React from 'react'`,
    `import { Row, Col } from 'bfd/Layout'`,
    `import Demo from 'public/Demo'`
  ]

  // 获取 DEMO、文档数据
  const demos = []
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
        item = item.trim()
        if (imports.indexOf(item) === -1) {
          imports.push(item)
        }
      })
      currentDemo.mainCode = currentDemo.code.replace(/import .*/g, '').trim()
    }
    currentDemo.name = currentDemo.mainCode.match(/(?:const|class)\s(\w+)/)[1]
  }]
  const reg = /@title\s(.+)|@desc\s(.+)|(\nimport [\s\S]+?)\/\*\*|@component\s(.+)/g
  source.replace(reg, (match, p1, p2, p3, p4) => {
    [p1, p2, p3].forEach((match, i) => {
      match && callbacks[i](match)
    })    
  })

  // 提前声明
  const codes = demos.map(demo => {
    return `const code${demo.name} = \`${demo.code}\`
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

  return `${imports.join('\r\n')} 

${codes.join('\r\n')}

export default () => {
  return (
    <div>
      ${layout}
    </div>
  )
}`
}