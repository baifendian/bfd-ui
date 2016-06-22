import React from 'react'
import <%= name %> from 'c/<%= name %>'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default () => {
  return (
    <div>
      <h1></h1>
      <h2><%= name %></h2>
      <Props>
        <Prop name="test" type="string">
          <p>test</p>
        </Prop>
      </Props>
    </div>
  )
}