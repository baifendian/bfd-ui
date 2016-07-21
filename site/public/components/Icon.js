import React from 'react'
import Icon from 'c/Icon'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const IconDemo = React.createClass({
  render() {
    return <Icon type="weixin" />
  }
})

const code = `import Icon from 'bfd-ui/lib/Icon'

export default React.createClass({
  render() {
    return <Icon type="weixin" />
  }
})`

export default () => {
  return (
    <div>
      <h1>图标 @hai.jiang</h1>
      <Pre>{code}</Pre>
      <IconDemo />
      <h2>Icon</h2>
      <Props>
        <Prop name="type" type="string" required>
          <p>图标类型，<a href="http://fontawesome.io/icons/" target="_blank">http://fontawesome.io/icons/</a></p>
        </Prop>
      </Props>
    </div>
  )
}