import React from 'react'
import { Link } from 'react-router'
import components from './components.json'
import './less/components.less'

export default React.createClass({
  render() {
    return (
      <div className="components">
      {
        this.props.children ? 
        this.props.children : 
        (
          <div className="list">
            {components.map((cate, i) => {
              return (
                <dl key={i}>
                  <dt>{cate.type}</dt>
                  {cate.list.map((component, i) => {
                    let img
                    try {
                      img = require('./images/' + component.name + '.jpg')  
                    } catch (e) {}
                    return (
                      <dd key={i}>
                        <Link to={'/components/' + component.name}>
                          <h4>{component.cn} {component.name}</h4>
                          {img ? <img src={img} /> : <div className="empty">暂无图片</div>}
                        </Link>
                      </dd>
                    )
                  })}
                </dl>
              )
            })}
          </div>
        )
      }
      </div>
    )
  }
})