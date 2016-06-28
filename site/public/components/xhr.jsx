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
  }, // 提交的数据，支持 FormData（IE10+）
  beforeSend(xhr) {}, // 请求发送前操作，如 setRequestHeader、定义 onprogress 事件等
  success(data) {},
  error() {},
  complete() {}
})`

const successUsage = `xhr.success = (res, option) => {
  if (typeof res !== 'object') {
    message.danger(option.url + ': response data should be JSON')
    return
  }
  switch (res.code) {
    case 200:
      option.success && option.success(res.data)
      break
    case 401:
      // redirect to '/login'
      break
    default:
      message.danger(res.message || 'unknown error')
  }
}`

export default () => {
  return (
    <div>
      <h1>AJAX 请求 @hai.jiang</h1>
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
      <Warn>处理后的数据需要返回，作为 success 回调参数</Warn>
      <h3>xhr.success(res, option)</h3>
      <p>全局成功回调，在 dataFilter 后执行，此方法会覆盖单独的 success 方法，如果需要可手动调用</p>
      <Pre>{successUsage}</Pre>
    </div>
  )
}