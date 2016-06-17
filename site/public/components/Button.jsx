import React from 'react'
import BubbleChart from 'c/BubbleChart'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import Panel from '../Panel'
import Button from 'c/Button'

const codeBasic = `import Button from 'bfd-ui/lib/Button'

export default () => {
  return (
    <div>
      <Button type="default">默认</Button>
      <Button type="primary">主要</Button>
      <Button type="primary" size="sm">小尺寸</Button>
    </div>
  )
}
`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>按钮 Button @hai.jiang</h1>
        <Pre>{`import Button from 'bfd-ui/lib/Button'

export default () => {
  return (
    <div>
      <Button>默认</Button>
      <Button type="primary">主要</Button>
      <Button type="primary" size="sm">小尺寸</Button>
    </div>
  )
}`}
        </Pre>
        <Button>默认</Button>
        <Button type="primary">主要</Button>
        <Button type="primary" size="sm">小尺寸</Button>

        <h2>Button</h2>
        <Props>
          <Prop name="type" type="string">
            <p>按钮类型，可选值：primary</p>
          </Prop>
          <Prop name="size" type="string">
            <p>按钮尺寸，可选值：sm</p>
          </Prop>
        </Props>
      </div>
    )
  }
})