import React from 'react'
import { Link } from 'react-router'
import Button from 'bfd/Button'
import { Row, Col } from 'bfd/Layout'
import Center from 'public/Center'
import Pre from 'public/Pre'
import Feature from './Feature'
import './index.less'

export default () => {

  const code = `import DatePicker from 'bfd/DatePicker'

class App {
  
  handleSelect(date) {
    console.log(date)
  }

  render() {
    return <DatePicker onSelect={this.handleSelect} />
  }
}`

  return (
    <div className="home">
      <div className="home__banner">
        <Center>
          <Row>
            <Col col="md-6" className="home__banner-left">
              <img src={require('./img/banner.png')} />
            </Col>
            <Col className="home__banner-info" right>
              <em>当前版本：v1.0</em>
              <h1>百分点 UI</h1>
              <h2>企业级前端整体解决方案</h2>
              <Link to="/guide#install">
                <Button>安装 v1.0</Button>
              </Link>
              <Link to="/guide">
                <Button className="home__banner-start">开始</Button>
              </Link>
            </Col>
          </Row>
        </Center>
      </div>

      <div className="home__middle">
        <Center>
          <Row>
            <Col col="md-6" className="home__middle-left">
              <h2>组件化开发</h2>
              <p>百分点 UI 抛弃了传统的组件封装方式，基于 React 组件开发思想，语义化 UI 的同时可作为一种数据类型自由传递，无论需求多么复杂，场景多么奇特，我们都可以搞定。</p>
            </Col>
            <Col col="md-6">
              <Pre className="home__middle-code">{code}</Pre>
            </Col>
          </Row>
        </Center>
      </div>

      <div className="home__features">
        <Center>
          <Row>
            <Feature title="组件化" icon={require('./img/feature_0.png')}>
              基于 React 组件开发思想，简单、灵活、高效
            </Feature>
            <Feature title="覆盖广" icon={require('./img/feature_1.png')}>
              覆盖基础组件，高级交互，以及计划推出的数据可视化组件
            </Feature>
            <Feature title="生态完整" icon={require('./img/feature_2.png')}>
              搭配脚手架，摆脱繁琐的环境配置、重复的基础工作
            </Feature>
            <Feature title="完全免费" icon={require('./img/feature_3.png')}>
              基于 BSD 协议，免费开源
            </Feature>
          </Row>
        </Center>
      </div>

      <div className="home__bottom">
        <Center>
          <h1>站在巨人的肩膀上，无所不能</h1>
          <p>百分点 UI 汲取了很多优秀的社区资源，通过开源的形式来回馈大家。</p>
        </Center>
      </div>
    </div>
  )
}