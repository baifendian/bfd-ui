import React from 'react'
import { Link } from 'react-router'
import components from './components.json'
import './less/components.less'

export default React.createClass({
  render() {
    return (
      <div className="components">
      {this.props.children ? this.props.children : (
        <ul>
        {components.map((component, i) => {
          return (
            <li key={i}>
              <Link to={'/components/' + component.name}>
                <div>{component.cn}</div>
                <img src={'/images/' + component.name + '.jpg'}/>
              </Link>
            </li>
          )
        })}
        </ul>
      )}
      </div>
    )
  }
})