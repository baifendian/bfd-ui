import React from 'react'
import TextOverflow from 'bfd/TextOverflow'
import Pre from 'public/Pre'
import Warn from 'public/Warn'

const TextOverflowDemo = React.createClass({
  render() {
    return (
      <TextOverflow>
        <p style={{width: '100px'}}>我是很长的一段文字，鼠标滑过可显示全部</p>
      </TextOverflow>
    )
  }
})

const code = `import TextOverflow from 'bfd-ui/lib/TextOverflow'

export default React.createClass({
  render() {
    return (
      <TextOverflow>
        <p style={{width: '100px'}}>我是很长的一段文字，鼠标滑过可显示全部</p>
      </TextOverflow>
    )
  }
})`

export default () => {
  return (
    <div>
      <h1>文字溢出 @hai.jiang</h1>
      <Pre>{code}</Pre>
      <TextOverflowDemo />
      <Warn>TextOverflow 只能包裹单个元素</Warn>
    </div>
  )
}