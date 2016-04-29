import React from 'react'
import Pre from './Pre'
import Warn from './Warn'

export default React.createClass({
  render() {
    return (
      <div className="rules">
        <p>目录</p>
        <ol>
          <li>
            <a href="#data-api">前后端接口规范</a>
          </li>
          <li>
            <a href="#style-guide">代码规范</a>
          </li>
        </ol>
        <h1 id="data-api">1、前后端接口规范</h1>
        <p>所有的接口（不区分请求类型）返回的格式都是 JSON，所以响应头 Content-Type 必须为 application/json</p>
        <p>基本格式：</p>
        <Pre>{`{
  "code": 200, // 200 代表成功
  "message": "", // 如果 code 不是 200，给出错误原因
  "data": {} // 具体前端需要的格式，类型不限
}`}</Pre>
        <Warn>Fetch、Form、支持 url 属性的的组件以及调用 xhr 组件的所有请求都遵循这个规范，出问题会自动给出全局提示，除非指定 error 回调</Warn>
        <h1 id="style-guide">2、代码规范</h1>
        <a href="http://git.baifendian.com/front-end/style-guide">http://git.baifendian.com/front-end/style-guide</a>
      </div>
    )
  }
})