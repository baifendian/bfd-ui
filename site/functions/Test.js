import React, { Component } from 'react'
import AutoComplete from 'bfd/AutoComplete'

const Test = () => {
  return (
    <AutoComplete placeholder="输入关键词" value={1} source={['test', 'test2']} />
  )
}

export default Test
