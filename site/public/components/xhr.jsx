import React from 'react'
import { Link } from 'react-router'
import Pre from '../Pre'
import Warn from '../Warn'

const code = `import xhr from 'bfd-ui/lib/xhr'

xhr({
  type: 'DELETE',
  url: '/user/5',
  success(data) {
    console.log(data)
  } 
})`

const xhrUsage = `xhr({
  type: 'DELETE', // HTTP 请求类型，默认 GET
  url: '/user/5', // 请求 URL 地址
  data: {
    key: value
  }, // POST 请求时提交的数据，value 如果为对象，自动 JSON.stringify
  success(data) {}, // 成功后的回调，这里的成功是指返回的 JSON code 值 为 200
  error() {}, // 失败后的回调，一般不需要指定，默认会有一个全局错误提示的 error handle
  complete() {} // 不管成功或者失败后的回调
})`

const dataFilterUsage = `xhr.dataFilter = (res, option) => {
  if (typeof res !== 'object') {
    message.danger(option.url + ': response data should be JSON')
  } else if (res.code !== 200) {
    message.danger(option.url + ': code ' + res.code + ', ' + (res.message || 'unknown error'))
  }
  return res.data
}`

export default () => {
  return (
    <div>
      <h1>AJAX 请求</h1>
      <p>即使有 Fetch、Form 的 action 属性、组件 url 属性等功能，还是有单独发送 AJAX 的需求</p>
      <Pre>{code}</Pre>
      <h2>xhr(option)</h2>
      <Pre>{xhrUsage}</Pre>
      <h2>全局设置</h2>
      <Warn>如果需要，请在所有的 AJAX 请求前进行设置</Warn>
      <h3>xhr.baseUrl</h3>
      <p>全局基础 URL，常用的场景是接口是另外的服务，方便统一设置路径</p>
      <Pre>{`xhr.baseUrl = 'http://192.168.184.236:8080/api/'`}</Pre>
      <h3>xhr.dataFilter(res, option)</h3>
      <p>全局数据过滤器，可对全局数据进行二次封装，也可进行一些全局处理</p>
      <Pre>{dataFilterUsage}</Pre>
      <Warn>处理后的数据需要返回，作为 success 回调参数</Warn>
    </div>
  )
}