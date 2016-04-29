import React from 'react'
import { Link } from 'react-router'
import Pre from '../Pre'
import xhr from 'c/xhr'

const code = `import xhr from 'bfd-ui/lib/xhr'

xhr({
  type: 'DELETE',
  url: '/user/5',
  success(data) {
    console.log(data)
  } 
})`

export default () => {
  return (
    <div>
      <h1>AJAX请求</h1>
      <p>即使有 Fetch、Form 的 action 属性、组件 url 属性等功能，但是还是有单独发送 ajax 的场景。</p>
      <p>返回的格式要求：<Link to="/rules#data-api">前后端接口规范</Link></p>
      <Pre>{code}</Pre>
      <h2>xhr(option)</h2>
      <Pre>{`{
  type: 'DELETE', // HTTP 请求类型，默认 GET
  url: '/user/5', // 请求 URL 地址
  data: {
    key: value
  }, // POST 请求时提交的数据，value 如果为对象，自动 JSON.stringify
  success(data) {}, // 成功后的回调，这里的成功是指返回的 JSON code 值 为 200
  error() {}, // 失败后的回调，一般不需要指定，默认会有一个全局错误提示的 error handle
  complete() {} // 不管成功或者失败后的回调
}`}</Pre>
    </div>
  )
}